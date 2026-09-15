"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { VEHICLE_TYPES, type VehicleTypeId } from "@/lib/constants";
import { bookingSchema } from "@/lib/validations";
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

const formSchema = bookingSchema.extend({
  vehicleYear: z.string().min(2),
  vehicleMake: z.string().min(1),
  vehicleModel: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

export function BookingWizard({
  services,
  addOns,
}: {
  services: Service[];
  addOns: AddOn[];
}) {
  const [step, setStep] = useState(0);
  const [slots, setSlots] = useState<string[]>([]);
  const [photos, setPhotos] = useState<{ url: string; publicId?: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as never,
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

  const watch = form.watch();
  const service = services.find((s) => s._id === watch.serviceId);

  const estimated = useMemo(() => {
    if (!service) return 0;
    const base = service.customQuote
      ? service.startingPrice
      : service.vehiclePrices?.[watch.vehicleType as VehicleTypeId] ??
        service.startingPrice;
    const addOnTotal = addOns
      .filter((a) => watch.addOnIds?.includes(a._id))
      .reduce((sum, a) => {
        if (a.pricingType === "vehicle" && a.vehiclePrices) {
          return (
            sum +
            (a.vehiclePrices[watch.vehicleType as VehicleTypeId] ?? a.fixedPrice ?? 0)
          );
        }
        return sum + (a.fixedPrice ?? 0);
      }, 0);
    return base + addOnTotal;
  }, [service, watch.vehicleType, watch.addOnIds, addOns]);

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
    if (!watch.preferredDate) return;
    fetch(`/api/availability/slots?date=${watch.preferredDate}`)
      .then((r) => r.json())
      .then((d) => setSlots(d.slots || []))
      .catch(() => setSlots([]));
  }, [watch.preferredDate]);

  const uploadPhoto = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload/booking", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    setPhotos((p) => [...p, data]);
    form.setValue("photos", [...photos, data]);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, photos }),
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
  });

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
      await onSubmit();
      return;
    }
    setStep((s) => Math.min(s + 1, 10));
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-gold/30 bg-midnight px-4 py-3";

  if (step === 11) {
    return (
      <div className="glass-panel rounded-3xl p-8 text-center">
        <h2 className="font-display text-3xl text-bright-gold">Request Submitted</h2>
        <p className="mt-4 text-off-white/80">
          Your booking request is pending review. We will contact you to confirm your
          appointment. A confirmation email has been sent if SMTP is configured.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel w-full min-w-0 overflow-hidden rounded-3xl p-4 sm:p-6 md:p-8">
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
        <select
          className={inputClass}
          {...form.register("serviceId", { required: true })}
        >
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
        <div className="space-y-2">
          {addOns.map((a) => (
            <label key={a._id} className="flex items-center gap-3">
              <input
                type="checkbox"
                value={a._id}
                checked={watch.addOnIds?.includes(a._id)}
                onChange={(e) => {
                  const current = watch.addOnIds || [];
                  form.setValue(
                    "addOnIds",
                    e.target.checked
                      ? [...current, a._id]
                      : current.filter((id) => id !== a._id)
                  );
                }}
              />
              {a.name}
            </label>
          ))}
        </div>
      )}

      {step === 3 && (
        <input type="date" className={inputClass} {...form.register("preferredDate")} />
      )}

      {step === 4 && (
        <select className={inputClass} {...form.register("preferredTime")}>
          <option value="">Select a time</option>
          {slots.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
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
              if (file) uploadPhoto(file).catch((err) => toast.error(String(err)));
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
        <div className="space-y-2 text-sm text-off-white/85">
          <p>Service: {service?.name}</p>
          <p>Estimated total: {formatCurrency(estimated)}</p>
          <p className="text-off-white/60">
            This is a request pending review — not a confirmed appointment.
          </p>
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
