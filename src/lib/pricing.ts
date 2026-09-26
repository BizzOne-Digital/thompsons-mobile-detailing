import type { VehicleTypeId } from "@/lib/constants";
import type { IAddOn } from "@/models/AddOn";
import type { IService } from "@/models/Service";

export function getServicePrice(
  service: Pick<IService, "vehiclePrices" | "startingPrice" | "customQuote">,
  vehicleType: VehicleTypeId
): number | null {
  if (service.customQuote) return null;
  const price = service.vehiclePrices?.[vehicleType];
  if (price != null) return price;
  return service.startingPrice || null;
}

export function getAddOnPrice(addOn: IAddOn, vehicleType: VehicleTypeId): number {
  if (addOn.pricingType === "fixed" && addOn.fixedPrice != null) {
    return addOn.fixedPrice;
  }
  if (addOn.pricingType === "vehicle" && addOn.vehiclePrices) {
    return addOn.vehiclePrices[vehicleType] ?? addOn.fixedPrice ?? 0;
  }
  return addOn.fixedPrice ?? 0;
}

export function calculateBookingTotal(
  service: IService,
  vehicleType: VehicleTypeId,
  addOns: IAddOn[]
) {
  const base = getServicePrice(service, vehicleType) ?? 0;
  const addOnTotal = addOns.reduce(
    (sum, a) => sum + getAddOnPrice(a, vehicleType),
    0
  );
  return base + addOnTotal;
}
