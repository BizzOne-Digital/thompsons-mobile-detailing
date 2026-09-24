import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { getSettings } from "@/lib/data";
import { toPublicSiteSettings } from "@/lib/public-settings";
import { CLIENT_IMAGES } from "@/lib/client-images";
import { resolvePublicImageUrl } from "@/lib/media-url";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Learn about Thompson's Mobile Detailing AZ — professional mobile auto detailing across the Phoenix Metro.",
  path: "/about",
});

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const site = toPublicSiteSettings(await getSettings());
  const ownerPhotoUrl = resolvePublicImageUrl(
    site.ownerPhotoUrl,
    CLIENT_IMAGES.ownerPortrait
  );
  const teamGroupPhotoUrl = resolvePublicImageUrl(
    site.teamGroupPhotoUrl,
    CLIENT_IMAGES.teamGroup
  );

  return (
    <PageShell
      title="About Thompson's Mobile Detailing AZ"
      subtitle="Professional mobile detailing built on precision, premium products, and factory-fresh results."
    >
      <AboutPageContent
        aboutText={site.aboutText}
        ownerPhotoUrl={ownerPhotoUrl}
        teamGroupPhotoUrl={teamGroupPhotoUrl}
      />
    </PageShell>
  );
}
