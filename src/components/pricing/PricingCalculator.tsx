"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { VEHICLE_TYPES, type VehicleTypeId } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type Service = {
  _id: string;
  name: string;
  slug: string;
  customQuote?: boolean;
  startingPrice: number;
  vehiclePrices?: { sedan?: number; midsize?: number; large?: number };
};

type AddOn = {
  _id: string;
  name: string;
  pricingType: string;
  fixedPrice?: number;
  vehiclePrices?: { sedan?: number; midsize?: number; large?: number };
};

export function PricingCalculator({
  services,
  addOns,
}: {
  services: Service[];
  addOns: AddOn[];
}) {
  const router = useRouter();
  const [serviceId, setServiceId] = useState(() => {
    if (typeof window === "undefined") return services[0]?._id || "";
    const serviceSlug = new URLSearchParams(window.location.search).get("service");
    if (serviceSlug) {
      const match = services.find((s) => s.slug === serviceSlug);
      if (match) return match._id;
    }
    return services[0]?._id || "";
  });
  const [vehicleType, setVehicleType] = useState<VehicleTypeId>("sedan");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const service = services.find((s) => s._id === serviceId);

  const total = useMemo(() => {
    if (!service) return 0;
    const base = service.customQuote
      ? service.startingPrice
      : service.vehiclePrices?.[vehicleType] ?? service.startingPrice;
    const addOnTotal = addOns
      .filter((a) => selectedAddOns.includes(a._id))
      .reduce((sum, a) => {
        if (a.pricingType === "vehicle" && a.vehiclePrices) {
          return sum + (a.vehiclePrices[vehicleType] ?? a.fixedPrice ?? 0);
        }
        return sum + (a.fixedPrice ?? 0);
      }, 0);
    return base + addOnTotal;
  }, [service, vehicleType, selectedAddOns, addOns]);

  const continueBooking = () => {
    const params = new URLSearchParams({
      service: service?.slug || "",
      vehicle: vehicleType,
      addOns: selectedAddOns.join(","),
    });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <label className="block text-sm text-off-white/80">
            Select service
            <select
              className="mt-2 w-full rounded-xl border border-gold/30 bg-midnight px-4 py-3"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
            >
              {services.map((s) => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-off-white/80">
            Vehicle type
            <select
              className="mt-2 w-full rounded-xl border border-gold/30 bg-midnight px-4 py-3"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value as VehicleTypeId)}
            >
              {VEHICLE_TYPES.map((v) => (
                <option key={v.id} value={v.id}>{v.label}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <p className="text-sm text-off-white/80">Optional add-ons</p>
          <div className="mt-2 max-h-56 space-y-2 overflow-auto pr-2">
            {addOns.map((a) => (
              <label
                key={a._id}
                className="flex items-center gap-3 rounded-xl border border-gold/20 px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={selectedAddOns.includes(a._id)}
                  onChange={(e) => {
                    setSelectedAddOns((prev) =>
                      e.target.checked
                        ? [...prev, a._id]
                        : prev.filter((id) => id !== a._id)
                    );
                  }}
                />
                <span className="text-sm">{a.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gold/20 pt-6">
        <div>
          <p className="text-sm text-off-white/70">Estimated total</p>
          <p className="text-3xl font-semibold text-bright-gold">
            {service?.customQuote ? "Custom quote" : formatCurrency(total)}
          </p>
          {service?.customQuote && (
            <p className="mt-1 text-xs text-off-white/60">
              Final price depends on vehicle condition and inspection.
            </p>
          )}
        </div>
        <Button onClick={continueBooking}>Continue to Booking</Button>
      </div>
    </div>
  );
}
