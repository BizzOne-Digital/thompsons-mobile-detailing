import { VEHICLE_TYPES, type VehicleTypeId } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

/** Large raised price — mobile-friendly */
export function PricePop({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-xl border border-bright-gold/45 bg-gradient-to-b from-navy/90 to-midnight px-3 py-1 font-display text-2xl font-bold tracking-tight text-white shadow-[0_4px_0_rgba(0,0,0,0.45),0_8px_24px_rgba(255,201,40,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] sm:text-3xl md:text-4xl ${className}`}
    >
      {children}
    </span>
  );
}

export function VehiclePriceTiers({
  vehiclePrices,
  startingPrice,
  highlightType,
  compact,
}: {
  vehiclePrices?: { sedan?: number; midsize?: number; large?: number };
  startingPrice: number;
  highlightType?: VehicleTypeId;
  compact?: boolean;
}) {
  return (
    <ul className={`space-y-2 ${compact ? "text-sm" : "text-sm md:text-base"}`}>
      {VEHICLE_TYPES.map((v) => {
        const amount = vehiclePrices?.[v.id] ?? startingPrice;
        const active = highlightType === v.id;
        return (
          <li
            key={v.id}
            className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 ${
              active
                ? "border-bright-gold/50 bg-gold/10"
                : "border-gold/15 bg-navy/25"
            }`}
          >
            <span
              className={`leading-snug ${active ? "text-off-white" : "text-off-white/70"}`}
            >
              {v.label}
            </span>
            <PricePop className="!px-2.5 !py-0.5 !text-lg sm:!text-xl md:!text-2xl">
              {formatCurrency(amount)}
            </PricePop>
          </li>
        );
      })}
    </ul>
  );
}

export function FixedPricePop({ amount }: { amount: number }) {
  return <PricePop>{formatCurrency(amount)}</PricePop>;
}
