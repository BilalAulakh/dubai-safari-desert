"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Calendar, Users, MapPin, Send, MessageCircle, AlertCircle } from "lucide-react";
import { bookingSchema, BookingFormData } from "@/lib/validations/booking";
import { Package, PickupLocation } from "@/types";
import { formatPrice } from "@/lib/utils";

interface BookingFormProps {
  packages: Package[];
  pickupLocations: PickupLocation[];
  defaultPackageId?: string;
}

export default function BookingForm({
  packages,
  pickupLocations,
  defaultPackageId,
}: BookingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Tomorrow's date as default min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      package_id: defaultPackageId || packages[0]?.id || "",
      booking_date: minDateString,
      adults: 2,
      children: 0,
      pickup_location: pickupLocations[0]?.name || "Downtown Dubai (Burj Khalifa area)",
      hotel_name: "",
      special_requests: "",
    },
  });

  const selectedPackageId = watch("package_id");
  const selectedPackage = packages.find((p) => p.id === selectedPackageId);
  const adultsCount = watch("adults") || 1;
  const childrenCount = watch("children") || 0;

  const estimatedTotal = selectedPackage
    ? selectedPackage.price * adultsCount + selectedPackage.price * 0.7 * childrenCount
    : 0;

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to submit booking request. Please try again."
        );
      }

      // Navigate to confirmation page
      router.push(`/booking/confirmation/${result.bookingReference}`);
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-900/15 shadow-xl space-y-8"
      id="safari-booking-form"
    >
      {submitError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      {/* 1. Safari Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center justify-center">
            1
          </span>
          <span>Choose Safari Package</span>
        </h3>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Selected Package *
          </label>
          <select
            {...register("package_id")}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} — From {formatPrice(pkg.price)} / guest
              </option>
            ))}
          </select>
          {errors.package_id && (
            <p className="mt-1 text-xs text-rose-500">{errors.package_id.message}</p>
          )}
        </div>
      </div>

      {/* 2. Date & Party Size */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center justify-center">
            2
          </span>
          <span>Date & Number of Guests</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Safari Date *
            </label>
            <div className="relative">
              <input
                type="date"
                min={minDateString}
                {...register("booking_date")}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            {errors.booking_date && (
              <p className="mt-1 text-xs text-rose-500">{errors.booking_date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Adults (Age 10+) *
            </label>
            <input
              type="number"
              min="1"
              max="50"
              {...register("adults", { valueAsNumber: true })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.adults && (
              <p className="mt-1 text-xs text-rose-500">{errors.adults.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Children (Age 3-9)
            </label>
            <input
              type="number"
              min="0"
              max="30"
              {...register("children", { valueAsNumber: true })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.children && (
              <p className="mt-1 text-xs text-rose-500">{errors.children.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* 3. Customer Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center justify-center">
            3
          </span>
          <span>Contact Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              {...register("customer_name")}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.customer_name && (
              <p className="mt-1 text-xs text-rose-500">{errors.customer_name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              WhatsApp / Phone Number *
            </label>
            <input
              type="tel"
              placeholder="e.g. +971 50 123 4567"
              {...register("phone")}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-rose-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Email Address (Optional)
            </label>
            <input
              type="email"
              placeholder="e.g. john@example.com"
              {...register("email")}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* 4. Pickup Location */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center justify-center">
            4
          </span>
          <span>Pickup Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Pickup Area in Dubai *
            </label>
            <select
              {...register("pickup_location")}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {pickupLocations.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
            {errors.pickup_location && (
              <p className="mt-1 text-xs text-rose-500">{errors.pickup_location.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Hotel Name or Apartment Building
            </label>
            <input
              type="text"
              placeholder="e.g. Hilton Dubai Creek, Room 402"
              {...register("hotel_name")}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Special Requests / Dietary Preferences (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Vegetarian food preferences, baby seat needed, birthday celebration."
              {...register("special_requests")}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Summary Box & Submit Button */}
      <div className="p-6 rounded-2xl bg-[#F8F5EE] border border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-500 uppercase font-semibold">Estimated Total</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              {formatPrice(estimatedTotal)}
            </span>
            <span className="text-xs text-slate-500">
              ({adultsCount} Adult{adultsCount > 1 ? "s" : ""}, {childrenCount} Child{childrenCount !== 1 ? "ren" : ""})
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            *Final price will be confirmed with our team over WhatsApp with no advance payment needed now.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          id="submit-booking-request-btn"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting Request...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Booking Request</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
