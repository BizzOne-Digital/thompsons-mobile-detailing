import type { VehicleTypeId } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export type PricingService = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  features?: string[];
  customQuote?: boolean;
  startingPrice: number;
  vehiclePrices?: { sedan?: number; midsize?: number; large?: number };
  estimatedDuration?: string;
};

export type PricingAddOn = {
  _id: string;
  name: string;
  description: string;
  pricingType: string;
  fixedPrice?: number;
  vehiclePrices?: { sedan?: number; midsize?: number; large?: number };
};

export function getServicePrice(
  service: Pick<PricingService, "customQuote" | "startingPrice" | "vehiclePrices">,
  vehicleType: VehicleTypeId
): number | null {
  if (service.customQuote) return null;
  return service.vehiclePrices?.[vehicleType] ?? service.startingPrice;
}

export function formatServicePrice(
  service: Pick<PricingService, "customQuote" | "startingPrice" | "vehiclePrices" | "name">,
  vehicleType: VehicleTypeId
) {
  if (service.customQuote) {
    return `Starting at ${formatCurrency(service.startingPrice)}`;
  }
  const price = getServicePrice(service, vehicleType);
  return price != null ? formatCurrency(price) : "—";
}

export function formatAddOnPrice(addOn: PricingAddOn, vehicleType: VehicleTypeId) {
  if (addOn.pricingType === "vehicle" && addOn.vehiclePrices) {
    const p = addOn.vehiclePrices[vehicleType] ?? addOn.fixedPrice;
    return p != null ? formatCurrency(p) : "—";
  }
  if (addOn.pricingType === "starting") {
    return `From ${formatCurrency(addOn.fixedPrice ?? 0)}`;
  }
  return formatCurrency(addOn.fixedPrice ?? 0);
}
