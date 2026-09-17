"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Calendar, Users, MapPin, Send, AlertCircle, ShieldCheck } from "lucide-react";
import { bookingSchema, BookingFormData } from "@/lib/validations/booking";
import { Package, PickupLocation } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useAppDispatch } from "@/lib/redux/hooks";
import { submitBookingRequest } from "@/lib/redux/slices/bookingsSlice";

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
  const dispatch = useAppDispatch();

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

  const estimatedTotalAED = selectedPackage
    ? selectedPackage.price * adultsCount + selectedPackage.price * 0.7 * childrenCount
    : 0;

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const actionResult = await dispatch(submitBookingRequest(data));
      if (submitBookingRequest.fulfilled.match(actionResult)) {
        router.push(`/booking/confirmation/${actionResult.payload.bookingReference}`);
      } else if (submitBookingRequest.rejected.match(actionResult)) {
        setSubmitError(actionResult.payload || "Failed to submit booking request. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-[#241A12] rounded-3xl p-7 sm:p-12 border border-[#C89B3C]/20 shadow-2xl space-y-9 transition-colors duration-200"
      id="safari-booking-form"
    >
      {submitError && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      {/* 1. Safari Selection */}
      <div className="space-y-4">
        <h3 className="font-heading text-xl font-bold text-[#17120D] dark:text-[#FBF7F0] flex items-center gap-3 pb-3 border-b border-[#C89B3C]/15">
          <span className="w-7 h-7 rounded-full bg-[#C89B3C] text-[#17120D] text-xs font-bold flex items-center justify-center shrink-0">
            1
          </span>
          <span>Choose Safari Package</span>
        </h3>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6258] dark:text-[#B8ADA2] mb-2">
            Selected Safari Experience *
          </label>
          <select
            {...register("package_id")}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/70 text-[#17120D] dark:text-[#FBF7F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all cursor-pointer"
          >
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id} className="bg-white dark:bg-[#17120D]">
                {pkg.name} — From {formatPrice(pkg.price)} / guest
              </option>
            ))}
          </select>
          {errors.package_id && (
            <p className="mt-1.5 text-xs text-rose-500">{errors.package_id.message}</p>
          )}
        </div>
      </div>

      {/* 2. Date & Party Size */}
      <div className="space-y-4">
        <h3 className="font-heading text-xl font-bold text-[#17120D] dark:text-[#FBF7F0] flex items-center gap-3 pb-3 border-b border-[#C89B3C]/15">
          <span className="w-7 h-7 rounded-full bg-[#C89B3C] text-[#17120D] text-xs font-bold flex items-center justify-center shrink-0">
            2
          </span>
          <span>Date & Number of Guests</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6258] dark:text-[#B8ADA2] mb-2">
              Safari Date *
            </label>
            <input
              type="date"
              min={minDateString}
              {...register("booking_date")}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/70 text-[#17120D] dark:text-[#FBF7F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all"
            />
            {errors.booking_date && (
              <p className="mt-1.5 text-xs text-rose-500">{errors.booking_date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6258] dark:text-[#B8ADA2] mb-2">
              Adults (Age 10+) *
            </label>
            <input
              type="number"
              min="1"
              max="50"
              {...register("adults", { valueAsNumber: true })}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/70 text-[#17120D] dark:text-[#FBF7F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all"
            />
            {errors.adults && (
              <p className="mt-1.5 text-xs text-rose-500">{errors.adults.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6258] dark:text-[#B8ADA2] mb-2">
              Children (Age 3-9)
            </label>
            <input
              type="number"
              min="0"
              max="30"
              {...register("children", { valueAsNumber: true })}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/70 text-[#17120D] dark:text-[#FBF7F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all"
            />
            {errors.children && (
              <p className="mt-1.5 text-xs text-rose-500">{errors.children.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* 3. Customer Details */}
      <div className="space-y-4">
        <h3 className="font-heading text-xl font-bold text-[#17120D] dark:text-[#FBF7F0] flex items-center gap-3 pb-3 border-b border-[#C89B3C]/15">
          <span className="w-7 h-7 rounded-full bg-[#C89B3C] text-[#17120D] text-xs font-bold flex items-center justify-center shrink-0">
            3
          </span>
          <span>Contact Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6258] dark:text-[#B8ADA2] mb-2">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              {...register("customer_name")}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/70 text-[#17120D] dark:text-[#FBF7F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all"
            />
            {errors.customer_name && (
              <p className="mt-1.5 text-xs text-rose-500">{errors.customer_name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6258] dark:text-[#B8ADA2] mb-2">
              WhatsApp / Phone Number *
            </label>
            <input
              type="tel"
              placeholder="e.g. +971 50 123 4567"
              {...register("phone")}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/70 text-[#17120D] dark:text-[#FBF7F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all"
            />
            {errors.phone && (
              <p className="mt-1.5 text-xs text-rose-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6258] dark:text-[#B8ADA2] mb-2">
              Email Address (Optional)
            </label>
            <input
              type="email"
              placeholder="e.g. john@example.com"
              {...register("email")}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/70 text-[#17120D] dark:text-[#FBF7F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all"
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-rose-500">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* 4. Pickup Location */}
      <div className="space-y-4">
        <h3 className="font-heading text-xl font-bold text-[#17120D] dark:text-[#FBF7F0] flex items-center gap-3 pb-3 border-b border-[#C89B3C]/15">
          <span className="w-7 h-7 rounded-full bg-[#C89B3C] text-[#17120D] text-xs font-bold flex items-center justify-center shrink-0">
            4
          </span>
          <span>Pickup Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6258] dark:text-[#B8ADA2] mb-2">
              Pickup Area in Dubai *
            </label>
            <select
              {...register("pickup_location")}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/70 text-[#17120D] dark:text-[#FBF7F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all cursor-pointer"
            >
              {pickupLocations.map((loc) => (
                <option key={loc.id} value={loc.name} className="bg-white dark:bg-[#17120D]">
                  {loc.name}
                </option>
              ))}
            </select>
            {errors.pickup_location && (
              <p className="mt-1.5 text-xs text-rose-500">{errors.pickup_location.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6258] dark:text-[#B8ADA2] mb-2">
              Hotel Name or Apartment Building
            </label>
            <input
              type="text"
              placeholder="e.g. Hilton Dubai Creek, Room 402"
              {...register("hotel_name")}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/70 text-[#17120D] dark:text-[#FBF7F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6258] dark:text-[#B8ADA2] mb-2">
              Special Requests / Dietary Preferences (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Vegetarian food preference, infant car seat, anniversary celebration."
              {...register("special_requests")}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/70 text-[#17120D] dark:text-[#FBF7F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Summary Box & Submit Button */}
      <div className="p-7 rounded-2xl bg-[#F2E8D5] dark:bg-[#1D150E] border border-[#C89B3C]/25 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6258] dark:text-[#B8ADA2]">
            Estimated Safari Total
          </span>
          <div className="flex items-baseline gap-2.5 mt-1">
            <span className="font-heading text-3xl sm:text-4xl font-bold text-[#17120D] dark:text-[#FBF7F0]">
              {formatPrice(estimatedTotalAED)}
            </span>
            <span className="text-xs text-[#6B6258] dark:text-[#B8ADA2]">
              ({adultsCount} Adult{adultsCount > 1 ? "s" : ""}{childrenCount > 0 ? `, ${childrenCount} Child${childrenCount > 1 ? "ren" : ""}` : ""})
            </span>
          </div>
          <p className="text-xs text-[#6B6258] dark:text-[#B8ADA2] mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>No advance card charge. Pay after confirmation with our team.</span>
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gold w-full sm:w-auto px-9 py-4 text-sm font-bold uppercase tracking-wider shadow-xl flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
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
