import { BRAND, SERVICE_AREAS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactTrustPanel } from "@/components/contact/ContactTrustPanel";
import { Button } from "@/components/ui/Button";

export const metadata = buildMetadata({ title: "Contact", path: "/contact" });

export default function ContactPage() {
  return (
    <PageShell
      title="Contact Thompson's Mobile Detailing AZ"
      subtitle="Call, text, email, or send a message. We're fully mobile across the Valley."
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="space-y-8">
          <div className="space-y-4 text-off-white/85">
            <p>Phone: <a href={BRAND.phoneHref} className="text-bright-gold">{BRAND.phone}</a></p>
            <p>Email: <a href={`mailto:${BRAND.email}`} className="text-bright-gold">{BRAND.email}</a></p>
            <p>Hours: {BRAND.hours}</p>
            <div className="flex flex-wrap gap-3">
              <Button href={BRAND.phoneHref}>Call</Button>
              <Button href={BRAND.smsHref} variant="outline">Text</Button>
              <Button href={`mailto:${BRAND.email}`} variant="outline">Email</Button>
              <Button href="/booking">Book Online</Button>
            </div>
            <p className="text-sm text-off-white/70">
              Service areas: {SERVICE_AREAS.join(", ")}
            </p>
          </div>
          <ContactTrustPanel />
        </div>
        <ContactForm />
      </div>
    </PageShell>
  );
}
