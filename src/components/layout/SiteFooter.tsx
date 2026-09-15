import Image from "next/image";
import Link from "next/link";
import { BRAND, NAV_LINKS, SERVICE_AREAS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 w-full min-w-0 overflow-x-clip border-t border-gold/20 carbon-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo.jpg" alt={BRAND.name} width={56} height={56} className="rounded-full" />
            <p className="font-display text-lg text-bright-gold">{BRAND.name}</p>
          </div>
          <p className="mt-4 text-sm text-off-white/75">
            {BRAND.tagline}. Professional mobile auto detailing across the Phoenix Metro.
          </p>
          <Button href="/booking" className="mt-6">
            Book Now
          </Button>
        </div>
        <div>
          <h3 className="font-semibold text-bright-gold">Navigation</h3>
          <ul className="mt-4 space-y-2 text-sm text-off-white/80">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-bright-gold">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/team" className="hover:text-bright-gold">Our Team</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-bright-gold">Service Areas</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-off-white/75">
            {SERVICE_AREAS.slice(0, 10).map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-bright-gold">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-off-white/80">
            <li>{BRAND.hours}</li>
            <li>
              <a href={BRAND.phoneHref} className="hover:text-bright-gold">
                {BRAND.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className="hover:text-bright-gold">
                {BRAND.email}
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-4 text-sm">
            <Link href="/privacy-policy" className="hover:text-bright-gold">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-bright-gold">
              Terms
            </Link>
          </div>
        </div>
      </div>
      <p className="relative border-t border-gold/10 py-6 text-center text-xs text-off-white/50">
        © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
      </p>
    </footer>
  );
}
