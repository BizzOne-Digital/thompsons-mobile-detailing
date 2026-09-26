import { buildMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";

export const metadata = buildMetadata({ title: "Privacy Policy", path: "/privacy-policy" });
export const dynamic = "force-dynamic";

export default async function PrivacyPage() {
  const settings = await getSettings();
  const content =
    settings?.privacyPolicy ||
    "Privacy policy content can be managed in the admin settings panel.";

  return (
    <PageShell title="Privacy Policy">
      <div className="max-w-3xl whitespace-pre-wrap text-off-white/85">{content}</div>
    </PageShell>
  );
}
