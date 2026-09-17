import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getSettings, getTeam } from "@/lib/data";
import { CLIENT_IMAGES } from "@/lib/client-images";
import { toPublicSiteSettings } from "@/lib/public-settings";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";

export const metadata = buildMetadata({ title: "Our Team", path: "/team" });
export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const [team, settingsRaw] = await Promise.all([getTeam(), getSettings()]);
  const site = toPublicSiteSettings(settingsRaw);
  const teamGroupPhoto =
    site.teamGroupPhotoUrl?.trim() || CLIENT_IMAGES.teamGroup;
  const ownerPhotoUrl =
    site.ownerPhotoUrl?.trim() || CLIENT_IMAGES.ownerPortrait;

  return (
    <PageShell
      title="Our Team"
      subtitle="Meet the professionals behind Thompson's Mobile Detailing AZ."
      heroImage={teamGroupPhoto}
    >
      <div className="space-y-12">
        <section className="overflow-hidden rounded-3xl border border-gold/25 gold-border">
          <div className="relative aspect-[21/9] min-h-[220px] w-full md:min-h-[320px]">
            <Image
              src={teamGroupPhoto}
              alt="Thompson's Mobile Detailing AZ team"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent"
              aria-hidden
            />
          </div>
          <div className="border-t border-gold/20 bg-navy/60 px-6 py-5 text-center">
            <p className="text-sm text-off-white/80 md:text-base">
              Factory-fresh results start with a crew that shows up prepared,
              professional, and ready to deliver at your location.
            </p>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[240px_1fr] lg:items-start">
          <div className="mx-auto w-full max-w-xs lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-gold/40">
              <Image
                src={ownerPhotoUrl}
                alt="Vernon Thompson, owner"
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>
            <p className="mt-3 text-center font-display text-lg text-bright-gold">
              Vernon Thompson
            </p>
            <p className="text-center text-sm text-off-white/65">Owner</p>
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-bright-gold">Leadership</h2>
            <p className="leading-relaxed text-off-white/80">
              Vernon founded Thompson&apos;s Mobile Detailing AZ on hands-on
              quality, honest recommendations, and the same factory-fresh standard
              you see on every detail — from maintenance washes to full
              restorations.
            </p>
            <Button href="/about" variant="outline">About our company</Button>
          </div>
        </section>

        {team.length > 0 ? (
          <section>
            <h2 className="font-display text-2xl text-bright-gold">Team profiles</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <article key={String(member._id)} className="glass-panel rounded-2xl p-6">
                  {member.photo?.url && (
                    <Image
                      src={member.photo.url}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="h-48 w-full rounded-xl object-cover"
                    />
                  )}
                  <h3 className="mt-4 text-xl font-semibold text-bright-gold">
                    {member.name}
                  </h3>
                  <p className="text-sm text-off-white/70">{member.role}</p>
                  <p className="mt-3 text-sm text-off-white/85">{member.biography}</p>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <p className="text-center text-sm text-off-white/55">
            Individual bios can be added in the admin portal as your team grows.
          </p>
        )}

        <div className="text-center">
          <Link
            href="/booking"
            className="text-sm font-semibold text-bright-gold hover:underline"
          >
            Book with our team →
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
