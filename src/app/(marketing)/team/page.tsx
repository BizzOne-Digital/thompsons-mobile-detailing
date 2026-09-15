import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { getTeam } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";

export const metadata = buildMetadata({ title: "Our Team", path: "/team" });
export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <PageShell
      title="Our Team"
      subtitle="Meet the professionals behind Thompson's Mobile Detailing AZ."
    >
      {team.length === 0 ? (
        <div className="glass-panel rounded-3xl p-10 text-center">
          <p className="text-off-white/80">
            Team profiles will appear here once added in the admin portal.
          </p>
          <p className="mt-3 text-sm text-off-white/60">
            Owner and team information can be published without inventing placeholder staff.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              <h2 className="mt-4 text-xl font-semibold text-bright-gold">{member.name}</h2>
              <p className="text-sm text-off-white/70">{member.role}</p>
              <p className="mt-3 text-sm text-off-white/85">{member.biography}</p>
            </article>
          ))}
        </div>
      )}
    </PageShell>
  );
}
