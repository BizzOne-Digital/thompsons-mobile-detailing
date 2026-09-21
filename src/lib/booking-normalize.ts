import type { VehicleTypeId } from "@/lib/constants";

const BOOKING_TZ = "America/Phoenix";
const FLEX_TIME = "To be confirmed";

function phoenixDefaultDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return new Intl.DateTimeFormat("en-CA", { timeZone: BOOKING_TZ }).format(d);
}

function asString(value: unknown): string {
  if (value == null) return "";
  return String(value).trim();
}

function asBool(value: unknown): boolean {
  return value === true || value === "true";
}

function vehicleType(value: unknown): VehicleTypeId {
  const v = asString(value);
  if (v === "midsize" || v === "large") return v;
  return "sedan";
}

function contactMethod(value: unknown): "email" | "phone" | "text" {
  const v = asString(value);
  if (v === "email" || v === "text") return v;
  return "phone";
}

export type NormalizedBooking = {
  customerName: string;
  email: string;
  phone: string;
  preferredContactMethod: "email" | "phone" | "text";
  serviceId: string;
  vehicleType: VehicleTypeId;
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleColor?: string;
  vehicleCondition?: string;
  addOnIds: string[];
  preferredDate: string;
  preferredTime: string;
  alternateDate?: string;
  alternateTime?: string;
  address: string;
  city: string;
  zip: string;
  locationType: string;
  accessInstructions?: string;
  petHair: boolean;
  majorStains: boolean;
  odorTreatment: boolean;
  customerNotes?: string;
  photos: { url: string; publicId?: string }[];
};

export function normalizeBookingBody(body: Record<string, unknown>): NormalizedBooking {
  const photosRaw = Array.isArray(body.photos) ? body.photos : [];
  const photos = photosRaw
    .map((p) => {
      if (!p || typeof p !== "object") return null;
      const row = p as { url?: unknown; publicId?: unknown };
      const url = asString(row.url);
      if (!url) return null;
      return {
        url,
        publicId: asString(row.publicId) || undefined,
      };
    })
    .filter(Boolean) as { url: string; publicId?: string }[];

  const addOnIds = Array.isArray(body.addOnIds)
    ? body.addOnIds.map((id) => asString(id)).filter(Boolean)
    : [];

  const preferredDate = asString(body.preferredDate) || phoenixDefaultDate();
  const preferredTime = asString(body.preferredTime) || FLEX_TIME;

  const notes = asString(body.customerNotes);
  const timeNote =
    preferredTime === FLEX_TIME && !asString(body.preferredTime)
      ? "Customer did not pick a slot time — please call to confirm."
      : "";
  const customerNotes = [notes, timeNote].filter(Boolean).join("\n") || undefined;

  return {
    customerName: asString(body.customerName) || "Customer",
    email: asString(body.email) || "not-provided@booking.local",
    phone: asString(body.phone) || "Not provided",
    preferredContactMethod: contactMethod(body.preferredContactMethod),
    serviceId: asString(body.serviceId),
    vehicleType: vehicleType(body.vehicleType),
    vehicleYear: asString(body.vehicleYear) || undefined,
    vehicleMake: asString(body.vehicleMake) || undefined,
    vehicleModel: asString(body.vehicleModel) || undefined,
    vehicleColor: asString(body.vehicleColor) || undefined,
    vehicleCondition: asString(body.vehicleCondition) || undefined,
    addOnIds,
    preferredDate,
    preferredTime,
    alternateDate: asString(body.alternateDate) || undefined,
    alternateTime: asString(body.alternateTime) || undefined,
    address: asString(body.address) || "To be confirmed",
    city: asString(body.city) || "Phoenix Metro",
    zip: asString(body.zip) || "00000",
    locationType: asString(body.locationType) || "Driveway",
    accessInstructions: asString(body.accessInstructions) || undefined,
    petHair: asBool(body.petHair),
    majorStains: asBool(body.majorStains),
    odorTreatment: asBool(body.odorTreatment),
    customerNotes,
    photos,
  };
}

export function shouldVerifySlot(time: string) {
  const t = time.toLowerCase();
  if (t === FLEX_TIME.toLowerCase()) return false;
  if (t.includes("flex") || t.includes("confirm") || t.includes("call")) {
    return false;
  }
  return true;
}
