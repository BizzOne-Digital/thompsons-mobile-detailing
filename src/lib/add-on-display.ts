import type { VehicleTypeId } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export type AddOnDisplayLike = {
  pricingType: string;
  fixedPrice?: number;
  vehiclePrices?: { sedan?: number; midsize?: number; large?: number };
};

export function formatAddOnStartingPrice(
  addOn: AddOnDisplayLike,
  vehicleType: VehicleTypeId = "sedan"
): string {
  if (addOn.pricingType === "vehicle" && addOn.vehiclePrices) {
    const p = addOn.vehiclePrices[vehicleType] ?? addOn.fixedPrice ?? 0;
    return formatCurrency(p);
  }
  return formatCurrency(addOn.fixedPrice ?? 0);
}

export const ESTIMATED_TOTAL_DISCLAIMER =
  "Final pricing may vary based on vehicle size, condition, and the level of restoration required. We confirm your total before service begins.";
