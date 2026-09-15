import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MobileActionBar } from "@/components/layout/MobileActionBar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="w-full min-w-0 overflow-x-clip pb-20 lg:pb-0">
        {children}
      </main>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
