import type { VehicleTypeId } from "@/lib/constants";
import type { AddOnCategory } from "@/lib/constants";
import {
  formatAddOnPrice,
  groupAddOnsByCategory,
  type PricingAddOn,
} from "@/lib/pricing-helpers";
import { sortAddOnsByDisplayOrder } from "@/lib/booking-add-ons";

const CATEGORY_LABELS: Record<AddOnCategory, string> = {
  Interior: "Interior add-on services",
  Exterior: "Exterior add-on services",
};

export function AddOnServicesCatalog({
  addOns,
  vehicleType = "sedan",
  intro,
}: {
  addOns: PricingAddOn[];
  vehicleType?: VehicleTypeId;
  intro?: string;
}) {
  const grouped = groupAddOnsByCategory(sortAddOnsByDisplayOrder(addOns));

  return (
    <div className="space-y-10">
      {intro ? (
        <p className="max-w-3xl text-sm text-off-white/70">{intro}</p>
      ) : null}
      {(["Interior", "Exterior"] as const).map((category) => {
        const items = grouped[category];
        if (!items.length) return null;
        return (
          <section key={category}>
            <h2 className="font-display text-xl text-bright-gold md:text-2xl">
              {CATEGORY_LABELS[category]}
            </h2>
            <ul className="mt-4 space-y-4">
              {items.map((a) => (
                <li
                  key={a._id}
                  className="glass-panel rounded-2xl p-5 md:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-off-white">
                      {a.name}
                    </h3>
                    <span className="shrink-0 text-lg font-semibold text-bright-gold">
                      {formatAddOnPrice(a, vehicleType)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-off-white/70">
                    {a.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
