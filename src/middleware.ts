import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/constants";
import { getCanonicalHost } from "@/lib/site-url";

const adminPaths = ["/admin"];
const publicAdminPaths = ["/admin/login"];

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

/** Production: apex + Vercel default domains → www.tmdaz.com (or NEXT_PUBLIC_SITE_URL host). */
function canonicalHostRedirect(request: NextRequest): NextResponse | null {
  if (process.env.VERCEL_ENV !== "production") {
    return null;
  }

  const host = request.headers.get("host")?.toLowerCase().split(":")[0] ?? "";
  const canonicalHost = getCanonicalHost();

  if (!host || host === canonicalHost) {
    return null;
  }

  const apexHost = canonicalHost.replace(/^www\./, "");
  const isVercelHost = host.endsWith(".vercel.app");
  const isApex = host === apexHost;

  if (!isVercelHost && !isApex) {
    return null;
  }

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.host = canonicalHost;
  return NextResponse.redirect(url, 308);
}

export async function middleware(request: NextRequest) {
  const canonical = canonicalHostRedirect(request);
  if (canonical) {
    return canonical;
  }

  const { pathname } = request.nextUrl;

  const isAdminArea = adminPaths.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (!isAdminArea) return NextResponse.next();

  if (publicAdminPaths.some((p) => pathname === p || pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const secret = getSecret();

  if (!token || !secret) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2)$).*)",
  ],
};
