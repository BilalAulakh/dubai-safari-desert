"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Car, Calculator, MessageCircle, ShieldCheck, ArrowRight, Minus, Plus } from "lucide-react";
import { Package } from "@/types";
import { createWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config/site";

interface FlexiblePriceCalculatorProps {
  pkg: Package;
}

export default function FlexiblePriceCalculator({ pkg }: FlexiblePriceCalculatorProps) {
  const [guests, setGuests] = useState<number>(2);
  const [vehicleType, setVehicleType] = useState<"sharing" | "private">("sharing");

  // Determine pricing logic
  const basePricePerPerson = pkg.price;
  const isPerVehicle = pkg.per_unit && (pkg.per_unit.toLowerCase().includes("buggy") || pkg.per_unit.toLowerCase().includes("quad") || pkg.per_unit.toLowerCase().includes("bike"));

  // Calculate discount tier for sharing tour
  let discountPercent = 0;

  if (!isPerVehicle) {
    if (guests >= 6) {
      discountPercent = 15;
    } else if (guests >= 3) {
      discountPercent = 10;
    }
  }

  // Calculate prices
  let perPersonPrice = basePricePerPerson;
  let totalPrice = 0;
  let originalTotal = 0;

  if (isPerVehicle) {
    // For ATV / Buggies (charged per vehicle/hour)
    totalPrice = basePricePerPerson * guests;
    originalTotal = (pkg.original_price || basePricePerPerson) * guests;
    if (guests >= 3) {
      discountPercent = 10;
      totalPrice = Math.round(totalPrice * 0.9);
    }
  } else {
    // For Safari Tours (Sharing vs Private)
    if (vehicleType === "private") {
      // Private 4x4 Land Cruiser fits up to 7 people
      const vehiclesNeeded = Math.ceil(guests / 6);
      const privateRatePerCar = Math.round(basePricePerPerson * 4.8);
      totalPrice = privateRatePerCar * vehiclesNeeded;
      originalTotal = basePricePerPerson * guests * 1.25;
    } else {
      perPersonPrice = Math.round(basePricePerPerson * (1 - discountPercent / 100));
      totalPrice = perPersonPrice * guests;
      originalTotal = (pkg.original_price || basePricePerPerson) * guests;
    }
  }

  const totalSavings = Math.max(0, originalTotal - totalPrice);

  // WhatsApp negotiation link
  const inquiryMessage = `Hello Safari Dune Tours! I am looking for a flexible price for *${pkg.name}*.
• Group Size: *${guests} Guests*
• Tour Mode: *${vehicleType === "private" ? "VIP Private 4x4 Car" : "Sharing 4x4"}*
• Estimated Quote: *AED ${totalPrice}*
Can you confirm your best flexible rate and today's availability? Thank you!`;

  const whatsappInquiryUrl = createWhatsAppUrl(SITE_CONFIG.contact.whatsapp, inquiryMessage);

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
      {/* Header */}
      <div className="bg-dune-900 px-6 py-5 text-sand-50">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-300">
          <Calculator className="h-4 w-4" aria-hidden="true" />
          <span>Plan your booking</span>
        </div>
        <p className="mt-3 text-xs text-sand-400">From</p>
        <p className="font-heading text-3xl font-semibold leading-none">
          AED {pkg.price}
          <span className="ml-2 text-sm font-normal text-sand-400">{pkg.per_unit || "per person"}</span>
        </p>
      </div>

      <div className="space-y-5 p-6">
        {/* Guest / quantity selector */}
        <div>
          <div className="mb-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              <Users className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
              {isPerVehicle ? "Vehicles" : "Guests"}
            </span>
            <span className="text-xs font-semibold text-accent">
              {guests >= 6 ? "Super group discount" : guests >= 3 ? "Group discount" : "Standard rate"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              disabled={guests <= 1}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-amber-500 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Decrease guests"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="flex-1 rounded-2xl bg-surface-alt py-2 text-center">
              <span className="font-heading text-2xl font-semibold text-ink">{guests}</span>
              <span className="ml-1.5 text-xs text-muted">
                {isPerVehicle ? (guests > 1 ? "vehicles" : "vehicle") : guests > 1 ? "guests" : "guest"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(25, g + 1))}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-amber-500 hover:text-accent"
              aria-label="Increase guests"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Sharing vs private 4x4 (tours only, not standalone buggies) */}
        {!isPerVehicle && (
          <div>
            <span className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              <Car className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
              Vehicle
            </span>
            <div className="grid grid-cols-2 gap-1 rounded-full bg-surface-alt p-1">
              {(["sharing", "private"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setVehicleType(type)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                    vehicleType === type ? "bg-dune-900 text-amber-300 shadow-sm" : "text-muted hover:text-ink"
                  }`}
                >
                  {type === "sharing" ? "Sharing 4x4" : "Private 4x4"}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">
              {vehicleType === "private"
                ? "An exclusive Land Cruiser for your group (up to 6-7 seats per car)."
                : "Shared 4x4 seating with other travellers."}
            </p>
          </div>
        )}

        {/* Live total */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/8 p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Estimated total</span>
              {totalSavings > 0 && <span className="mt-1 block text-sm text-muted line-through">AED {originalTotal}</span>}
              <span className="block whitespace-nowrap font-heading text-3xl font-semibold leading-tight text-ink">AED {totalPrice}</span>
            </div>
            {totalSavings > 0 && (
              <span className="shrink-0 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white">
                Save AED {totalSavings}
              </span>
            )}
          </div>
          <p className="mt-2 text-xs text-muted">
            {vehicleType === "private" && !isPerVehicle
              ? `Private car for ${guests} guests`
              : `About AED ${Math.round(totalPrice / guests)} each`}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <Link href={`/booking?package=${encodeURIComponent(pkg.id)}&adults=${guests}`} className="btn-gold btn-lg group w-full">
            <span>Book this rate</span>
            <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <a href={whatsappInquiryUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-lg w-full">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Ask for a group deal</span>
          </a>
        </div>

        <p className="flex items-center justify-center gap-2 text-xs text-muted">
          <ShieldCheck className="h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
          No advance payment. Pay on the day.
        </p>
      </div>
    </div>
  );
}
