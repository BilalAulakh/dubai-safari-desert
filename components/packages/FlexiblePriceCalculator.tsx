"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Users, Car, MessageCircle, ShieldCheck, ArrowRight, Minus, Plus, Sparkles } from "lucide-react";
import { Package } from "@/types";
import { createWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config/site";

interface FlexiblePriceCalculatorProps {
  pkg: Package;
}

const MIN_GUESTS = 1;
const MAX_GUESTS = 25;

export default function FlexiblePriceCalculator({ pkg }: FlexiblePriceCalculatorProps) {
  const [guests, setGuests] = useState<number>(2);
  const [vehicleType, setVehicleType] = useState<"sharing" | "private">("sharing");
  const guestsLabelId = useId();
  const vehicleLabelId = useId();

  // Pricing rules (unchanged): group discounts on shared tours, private cars priced per car,
  // buggies and quads priced per vehicle
  const basePricePerPerson = pkg.price;
  const isPerVehicle = pkg.per_unit && (pkg.per_unit.toLowerCase().includes("buggy") || pkg.per_unit.toLowerCase().includes("quad") || pkg.per_unit.toLowerCase().includes("bike"));

  let discountPercent = 0;
  if (!isPerVehicle) {
    if (guests >= 6) {
      discountPercent = 15;
    } else if (guests >= 3) {
      discountPercent = 10;
    }
  }

  let perPersonPrice = basePricePerPerson;
  let totalPrice = 0;
  let originalTotal = 0;
  let vehiclesNeeded = 0;
  let privateRatePerCar = 0;

  if (isPerVehicle) {
    totalPrice = basePricePerPerson * guests;
    originalTotal = (pkg.original_price || basePricePerPerson) * guests;
    if (guests >= 3) {
      discountPercent = 10;
      totalPrice = Math.round(totalPrice * 0.9);
    }
  } else if (vehicleType === "private") {
    // Private 4x4 Land Cruiser fits up to 6-7 people
    vehiclesNeeded = Math.ceil(guests / 6);
    privateRatePerCar = Math.round(basePricePerPerson * 4.8);
    totalPrice = privateRatePerCar * vehiclesNeeded;
  } else {
    perPersonPrice = Math.round(basePricePerPerson * (1 - discountPercent / 100));
    totalPrice = perPersonPrice * guests;
    originalTotal = (pkg.original_price || basePricePerPerson) * guests;
  }

  const isPrivate = !isPerVehicle && vehicleType === "private";
  // Savings only against the package's real list price; a private car has no list price to compare
  const totalSavings = isPrivate ? 0 : Math.max(0, originalTotal - totalPrice);
  const subtotal = basePricePerPerson * guests;
  const groupDiscount = isPrivate ? 0 : Math.max(0, subtotal - totalPrice);
  const unitWord = isPerVehicle ? (guests > 1 ? "vehicles" : "vehicle") : guests > 1 ? "guests" : "guest";

  const inquiryMessage = `Hello Safari Dune Tours! I am looking for a flexible price for *${pkg.name}*.
• Group Size: *${guests} Guests*
• Tour Mode: *${vehicleType === "private" ? "VIP Private 4x4 Car" : "Sharing 4x4"}*
• Estimated Quote: *AED ${totalPrice}*
Can you confirm your best flexible rate and today's availability? Thank you!`;

  const whatsappInquiryUrl = createWhatsAppUrl(SITE_CONFIG.contact.whatsapp, inquiryMessage);

  const stepperClass =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-200 hover:border-amber-500 hover:bg-amber-500/8 hover:text-accent active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:bg-transparent disabled:hover:text-ink";
  const labelClass = "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted";

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      {/* Price header */}
      <div className="border-b border-line px-5 py-4">
        <p className="flex items-baseline gap-2 text-sm text-muted">
          From
          {pkg.original_price && pkg.original_price > pkg.price && (
            <span className="line-through">AED {pkg.original_price}</span>
          )}
        </p>
        <p className="mt-0.5 font-heading text-[1.75rem] font-bold leading-tight tracking-tight text-ink">
          AED {pkg.price}
          <span className="ml-1.5 text-sm font-normal tracking-normal text-muted">{pkg.per_unit || "per person"}</span>
        </p>
      </div>

      <div className="space-y-4 p-5">
        {/* Guest / vehicle count */}
        <div role="group" aria-labelledby={guestsLabelId}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <span id={guestsLabelId} className={labelClass}>
              <Users className="h-4 w-4 text-amber-500" aria-hidden="true" />
              {isPerVehicle ? "Vehicles" : "Guests"}
            </span>
            {discountPercent > 0 && !isPrivate && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/12 px-2.5 py-0.5 text-xs font-semibold text-accent">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Group rate −{discountPercent}%
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(MIN_GUESTS, g - 1))}
              disabled={guests <= MIN_GUESTS}
              className={stepperClass}
              aria-label={isPerVehicle ? "Fewer vehicles" : "Fewer guests"}
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <output
              aria-live="polite"
              className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-surface-alt text-center"
            >
              <span className="font-heading text-xl font-bold text-ink">{guests}</span>
              <span className="text-sm text-muted">{unitWord}</span>
            </output>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
              disabled={guests >= MAX_GUESTS}
              className={stepperClass}
              aria-label={isPerVehicle ? "More vehicles" : "More guests"}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Sharing vs private 4x4 (tours only, not standalone buggies) */}
        {!isPerVehicle && (
          <div role="group" aria-labelledby={vehicleLabelId}>
            <span id={vehicleLabelId} className={`${labelClass} mb-2`}>
              <Car className="h-4 w-4 text-amber-500" aria-hidden="true" />
              Vehicle
            </span>
            <div className="grid grid-cols-2 gap-1 rounded-full bg-surface-alt p-1">
              {(["sharing", "private"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setVehicleType(type)}
                  aria-pressed={vehicleType === type}
                  className={`min-h-10 rounded-full px-3 text-sm font-semibold transition-all duration-200 ${
                    vehicleType === type ? "bg-dune-900 text-amber-300 shadow-sm" : "text-muted hover:text-ink"
                  }`}
                >
                  {type === "sharing" ? "Sharing 4x4" : "Private 4x4"}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-muted">
              {isPrivate
                ? "An exclusive Land Cruiser for your group (up to 6-7 seats per car)."
                : "Shared 4x4 seating with other travellers."}
            </p>
          </div>
        )}

        {/* Estimate with its breakdown */}
        <div className="rounded-xl bg-surface-alt p-4" aria-live="polite">
          <dl className="space-y-1.5 text-sm">
            {isPrivate ? (
              <div className="flex justify-between gap-3">
                <dt className="text-muted">
                  Private 4x4 × {vehiclesNeeded} {vehiclesNeeded > 1 ? "cars" : "car"}
                </dt>
                <dd className="font-medium text-ink">AED {privateRatePerCar * vehiclesNeeded}</dd>
              </div>
            ) : (
              <>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">
                    AED {basePricePerPerson} × {guests} {unitWord}
                  </dt>
                  <dd className="font-medium text-ink">AED {subtotal}</dd>
                </div>
                {groupDiscount > 0 && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">Group rate ({discountPercent}%)</dt>
                    <dd className="font-medium text-emerald-700 dark:text-emerald-400">−AED {groupDiscount}</dd>
                  </div>
                )}
              </>
            )}
          </dl>

          <div className="mt-3 flex items-end justify-between gap-3 border-t border-line pt-3">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted">Estimated total</span>
              {totalSavings > 0 && <span className="mt-0.5 block text-sm text-muted line-through">AED {originalTotal}</span>}
              <span className="block whitespace-nowrap font-heading text-2xl font-bold leading-tight text-ink">
                AED {totalPrice}
              </span>
            </div>
            {totalSavings > 0 && (
              <span className="shrink-0 rounded-full bg-emerald-700 px-2.5 py-1 text-xs font-semibold text-white">
                Save AED {totalSavings}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted">
            {isPrivate ? `Private car for ${guests} ${unitWord}` : `About AED ${Math.round(totalPrice / guests)} each`}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Link href={`/booking?package=${encodeURIComponent(pkg.id)}&adults=${guests}`} className="btn-gold group w-full">
            <span>Book this rate</span>
            <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <a href={whatsappInquiryUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Ask for a group deal</span>
          </a>
        </div>

        <p className="flex items-center justify-center gap-2 text-center text-sm text-muted">
          <ShieldCheck className="h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
          No advance payment. Pay on the day.
        </p>
      </div>
    </div>
  );
}
