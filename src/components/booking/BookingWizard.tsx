"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { VEHICLE_TYPES, type VehicleTypeId } from "@/lib/constants";
import { filterBookableAddOns } from "@/lib/add-on-package-rules";
import {
  ESTIMATED_TOTAL_DISCLAIMER,
  formatAddOnStartingPrice,
} from "@/lib/add-on-display";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useSiteSettings } from "@/components/layout/SiteSettingsProvider";

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
  slug: string;
  name: string;
  pricingType: string;
  fixedPrice?: number;
  vehiclePrices?: { sedan?: number; midsize?: number; large?: number };
  serviceSlugs?: string[];
};

type FormValues = {
  serviceId?: string;
  vehicleType?: VehicleTypeId;
  addOnIds?: string[];
  preferredDate?: string;
  preferredTime?: string;
  alternateDate?: string;
  alternateTime?: string;
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleColor?: string;
  vehicleCondition?: string;
  customerName?: string;
  email?: string;
  phone?: string;
  preferredContactMethod?: "email" | "phone" | "text";
  address?: string;
  city?: string;
  zip?: string;
  locationType?: string;
  accessInstructions?: string;
  petHair?: boolean;
  majorStains?: boolean;
  odorTreatment?: boolean;
  customerNotes?: string;
  photos?: { url: string; publicId?: string }[];
};

export function BookingWizard({
  services,
  addOns,
}: {
  services: Service[];
  addOns: AddOn[];
}) {
  const { bookingNotice } = useSiteSettings();
  const [step, setStep] = useState(0);
  const [slots, setSlots] = useState<string[]>([]);
  const [photos, setPhotos] = useState<{ url: string; publicId?: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      preferredContactMethod: "phone",
      vehicleType: "sedan",
      addOnIds: [] as string[],
      petHair: false,
      majorStains: false,
      odorTreatment: false,
      photos: [],
      locationType: "Driveway",
    },
  });

  const serviceId = useWatch({ control: form.control, name: "serviceId" });
  const vehicleType = useWatch({
    control: form.control,
    name: "vehicleType",
  }) as VehicleTypeId | undefined;
  const addOnIds = useWatch({ control: form.control, name: "addOnIds" });
  const preferredDate = useWatch({ control: form.control, name: "preferredDate" });
  const preferredTime = useWatch({ control: form.control, name: "preferredTime" });

  const service = services.find((s) => s._id === serviceId);

  const bookableAddOns = useMemo(() => {
    return filterBookableAddOns(addOns, service?.slug);
  }, [addOns, service?.slug]);

  useEffect(() => {
    const allowed = new Set(bookableAddOns.map((a) => a._id));
    const current = form.getValues("addOnIds") ?? [];
    const next = current.filter((id) => allowed.has(id));
    if (next.length !== current.length) {
      form.setValue("addOnIds", next);
    }
  }, [bookableAddOns, form]);

  const estimated = useMemo(() => {
    if (!service) return 0;
    const base = service.customQuote
      ? service.startingPrice
      : service.vehiclePrices?.[vehicleType as VehicleTypeId] ??
        service.startingPrice;
    const addOnTotal = bookableAddOns
      .filter((a) => addOnIds?.includes(a._id))
      .reduce((sum, a) => {
        if (a.pricingType === "vehicle" && a.vehiclePrices) {
          return (
            sum +
            (a.vehiclePrices[vehicleType as VehicleTypeId] ?? a.fixedPrice ?? 0)
          );
        }
        return sum + (a.fixedPrice ?? 0);
      }, 0);
    return base + addOnTotal;
  }, [service, vehicleType, addOnIds, bookableAddOns]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceSlug = params.get("service");
    const vehicle = params.get("vehicle") as VehicleTypeId | null;
    const addOnParam = params.get("addOns");
    if (serviceSlug) {
      const match = services.find((s) => s.slug === serviceSlug);
      if (match) form.setValue("serviceId", match._id);
    }
    if (vehicle) form.setValue("vehicleType", vehicle);
    if (addOnParam) form.setValue("addOnIds", addOnParam.split(",").filter(Boolean));
  }, [services, form]);

  useEffect(() => {
    if (!preferredDate) return;
    fetch(`/api/availability/slots?date=${preferredDate}`)
      .then((r) => r.json())
      .then((d) => setSlots(d.slots || []))
      .catch(() => setSlots([]));
  }, [preferredDate]);

  const uploadPhoto = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload/booking", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    setPhotos((p) => {
      const next = [...p, data];
      form.setValue("photos", next);
      return next;
    });
  };

  const submitBooking = async () => {
    setSubmitting(true);
    try {
      const values = form.getValues();
      const payload = {
        ...values,
        photos: photos.length ? photos : values.photos ?? [],
      };
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      toast.success(data.message);
      setStep(11);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    "Service",
    "Vehicle type",
    "Add-ons",
    "Date",
    "Time",
    "Vehicle details",
    "Contact",
    "Address",
    "Photos",
    "Notes",
    "Review",
  ];

  const next = async () => {
    if (step === 10) {
      await submitBooking();
      return;
    }
    setStep((s) => Math.min(s + 1, 10));
  };

  const showEstimate = step >= 1 && service && !service.customQuote;

  const estimatePanel = showEstimate ? (
    <div className="mb-6 rounded-2xl border border-gold/25 bg-midnight/60 p-4 sm:p-5">
      <p className="text-sm text-off-white/70">Estimated Total</p>
      <p className="mt-1 font-display text-3xl text-bright-gold">
        {formatCurrency(estimated)}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-off-white/55">
        {ESTIMATED_TOTAL_DISCLAIMER}
      </p>
    </div>
  ) : null;

  if (step === 11) {
    return (
      <div className="glass-panel rounded-3xl p-8 text-center">
        <h2 className="font-display text-3xl text-bright-gold">Request Submitted</h2>
        <p className="mt-4 text-off-white/80">
          {bookingNotice}
        </p>
      </div>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-gold/30 bg-midnight px-4 py-3";

  return (
    <div className="glass-panel w-full min-w-0 overflow-hidden rounded-3xl p-4 sm:p-6 md:p-8">
      {estimatePanel}
      <div className="-mx-1 mb-6 flex gap-2 overflow-x-auto pb-1 text-xs sm:mx-0 sm:flex-wrap sm:overflow-visible">
        {steps.map((label, i) => (
          <span
            key={label}
            className={`shrink-0 rounded-full px-3 py-1 ${
              i === step ? "bg-gold text-midnight" : "bg-white/10 text-off-white/70"
            }`}
          >
            {i + 1}. {label}
          </span>
        ))}
      </div>

      {step === 0 && (
        <select className={inputClass} {...form.register("serviceId")}>
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>
      )}

      {step === 1 && (
        <select className={inputClass} {...form.register("vehicleType")}>
          {VEHICLE_TYPES.map((v) => (
            <option key={v.id} value={v.id}>{v.label}</option>
          ))}
        </select>
      )}

      {step === 2 && (
        <div className="space-y-3">
          {bookableAddOns.length === 0 ? (
            <p className="text-sm text-off-white/70">
              No optional add-ons for this package — everything included is already
              part of your detail. Continue to schedule your appointment.
            </p>
          ) : (
            bookableAddOns.map((a) => (
              <label
                key={a._id}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-gold/15 px-4 py-3 hover:border-gold/35"
              >
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    value={a._id}
                    checked={addOnIds?.includes(a._id)}
                    onChange={(e) => {
                      const current = addOnIds || [];
                      form.setValue(
                        "addOnIds",
                        e.target.checked
                          ? [...current, a._id]
                          : current.filter((id) => id !== a._id)
                      );
                    }}
                  />
                  <span className="text-sm font-medium">{a.name}</span>
                </span>
                <span className="shrink-0 text-sm text-bright-gold">
                  {formatAddOnStartingPrice(
                    a,
                    (vehicleType ?? "sedan") as VehicleTypeId
                  )}
                </span>
              </label>
            ))
          )}
        </div>
      )}

      {step === 3 && (
        <div>
          <input
            type="date"
            className={inputClass}
            {...form.register("preferredDate")}
          />
          <p className="mt-2 text-xs text-off-white/55">
            Pick any date that works for you. We confirm by phone or email.
          </p>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <input
            placeholder="Preferred time (e.g. 10am, afternoon, call me)"
            className={inputClass}
            {...form.register("preferredTime")}
          />
          {slots.length > 0 && (
            <select
              className={inputClass}
              value={
                slots.includes(preferredTime || "")
                  ? preferredTime
                  : ""
              }
              onChange={(e) => {
                if (e.target.value) form.setValue("preferredTime", e.target.value);
              }}
            >
              <option value="">Or pick an available slot</option>
              {slots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          )}
          {preferredDate && slots.length === 0 && (
            <p className="text-sm text-off-white/60">
              Type your preferred time above — we will confirm with you.
            </p>
          )}
        </div>
      )}

      {step === 5 && (
        <div className="grid gap-4 md:grid-cols-2">
          <input placeholder="Year" className={inputClass} {...form.register("vehicleYear")} />
          <input placeholder="Make" className={inputClass} {...form.register("vehicleMake")} />
          <input placeholder="Model" className={inputClass} {...form.register("vehicleModel")} />
          <input placeholder="Color" className={inputClass} {...form.register("vehicleColor")} />
          <input
            placeholder="Condition notes"
            className={`${inputClass} md:col-span-2`}
            {...form.register("vehicleCondition")}
          />
        </div>
      )}

      {step === 6 && (
        <div className="grid gap-4 md:grid-cols-2">
          <input placeholder="Full name" className={inputClass} {...form.register("customerName")} />
          <input placeholder="Email" className={inputClass} {...form.register("email")} />
          <input placeholder="Phone" className={inputClass} {...form.register("phone")} />
          <select className={inputClass} {...form.register("preferredContactMethod")}>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="text">Text</option>
          </select>
        </div>
      )}

      {step === 7 && (
        <div className="grid gap-4 md:grid-cols-2">
          <input placeholder="Street address" className={`${inputClass} md:col-span-2`} {...form.register("address")} />
          <input placeholder="City" className={inputClass} {...form.register("city")} />
          <input placeholder="ZIP" className={inputClass} {...form.register("zip")} />
          <input placeholder="Location type" className={inputClass} {...form.register("locationType")} />
          <input
            placeholder="Parking / access instructions"
            className={inputClass}
            {...form.register("accessInstructions")}
          />
          <label className="flex items-center gap-2 md:col-span-2">
            <input type="checkbox" {...form.register("petHair")} /> Pet hair present
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...form.register("majorStains")} /> Major stains or spills
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...form.register("odorTreatment")} /> Odor treatment needed
          </label>
        </div>
      )}

      {step === 8 && (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadPhoto(file).catch(() => {});
            }}
          />
          <p className="mt-2 text-sm text-off-white/60">
            Optional vehicle condition photos (max 8MB, PNG/JPEG/WebP/GIF).
          </p>
        </div>
      )}

      {step === 9 && (
        <textarea
          className={`${inputClass} min-h-32`}
          placeholder="Additional notes"
          {...form.register("customerNotes")}
        />
      )}

      {step === 10 && (
        <div className="space-y-3 text-sm text-off-white/85">
          <p>Service: {service?.name}</p>
          <p>
            Vehicle:{" "}
            {VEHICLE_TYPES.find((v) => v.id === vehicleType)?.label}
          </p>
          {addOnIds?.length ? (
            <div>
              <p className="font-medium text-off-white">Add-ons selected:</p>
              <ul className="mt-1 list-inside list-disc text-off-white/75">
                {bookableAddOns
                  .filter((a) => addOnIds?.includes(a._id))
                  .map((a) => (
                    <li key={a._id}>{a.name}</li>
                  ))}
              </ul>
            </div>
          ) : null}
          <p className="text-off-white/60">{bookingNotice}</p>
        </div>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="ghost"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          Back
        </Button>
        <Button type="button" onClick={next} disabled={submitting}>
          {step === 10 ? "Submit Booking Request" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
