import { buildMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";

export const metadata = buildMetadata({ title: "Terms of Service", path: "/terms" });
export const dynamic = "force-dynamic";

export default async function TermsPage() {
  const settings = await getSettings();
  const content =
    settings?.termsOfService ||
    "Terms of service content can be managed in the admin settings panel.";

  return (
    <PageShell title="Terms of Service">
      <div className="max-w-3xl whitespace-pre-wrap text-off-white/85">{content}</div>
    </PageShell>
  );
}
