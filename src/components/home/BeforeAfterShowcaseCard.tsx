import Image from "next/image";

export type BeforeAfterShowcaseItem = {
  title: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
};

export function BeforeAfterShowcaseCard({ item }: { item: BeforeAfterShowcaseItem }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gold/20 bg-navy/30 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent"
          aria-hidden
        />
        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
          Before
        </div>
        <div className="absolute right-4 top-4 rounded-full border border-bright-gold/40 bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-bright-gold backdrop-blur-sm">
          After
        </div>
      </div>
      <div className="border-t border-gold/15 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-bright-gold/90">
          {item.category}
        </p>
        <h3 className="mt-1 font-display text-lg text-off-white">{item.title}</h3>
      </div>
    </article>
  );
}
