import Image from "next/image";

export type BeforeAfterPairItem = {
  title: string;
  category: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  singleImage?: boolean;
};

export function BeforeAfterPairCard({ item }: { item: BeforeAfterPairItem }) {
  if (item.singleImage) {
    return (
      <article className="overflow-hidden rounded-2xl border border-gold/20 bg-navy/30">
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10]">
          <Image
            src={item.afterSrc}
            alt={item.afterAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
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

  return (
    <article className="overflow-hidden rounded-2xl border border-gold/20 bg-navy/30">
      <div className="grid grid-cols-2 gap-0.5 bg-gold/20">
        <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
          <Image
            src={item.beforeSrc}
            alt={item.beforeAlt}
            fill
            className="object-cover"
            sizes="50vw"
          />
          <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
            Before
          </span>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
          <Image
            src={item.afterSrc}
            alt={item.afterAlt}
            fill
            className="object-cover"
            sizes="50vw"
          />
          <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase text-bright-gold">
            After
          </span>
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
