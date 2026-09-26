import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteSettingsProvider } from "@/components/layout/SiteSettingsProvider";
import { getSettings } from "@/lib/data";
import { toPublicSiteSettings } from "@/lib/public-settings";

export const dynamic = "force-dynamic";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const publicSettings = toPublicSiteSettings(settings);

  return (
    <SiteSettingsProvider settings={publicSettings}>
      <AnnouncementBar />
      <SiteHeader />
      <main className="w-full min-w-0 overflow-x-clip pb-20 lg:pb-0">
        {children}
      </main>
      <SiteFooter />
      <MobileActionBar />
    </SiteSettingsProvider>
  );
}
