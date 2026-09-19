"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Car, Calculator, MessageCircle, ShieldCheck, CheckCircle2, ArrowRight, Minus, Plus } from "lucide-react";
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
  let tierLabel = "Standard Rate";

  if (!isPerVehicle) {
    if (guests >= 6) {
      discountPercent = 15;
      tierLabel = "Super Group Saver (15% OFF)";
    } else if (guests >= 3) {
      discountPercent = 10;
      tierLabel = "Group Saver (10% OFF)";
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
      tierLabel = "Multi-Vehicle Discount (10% OFF)";
    }
  } else {
    // For Safari Tours (Sharing vs Private)
    if (vehicleType === "private") {
      // Private 4x4 Land Cruiser fits up to 7 people
      const vehiclesNeeded = Math.ceil(guests / 6);
      const privateRatePerCar = Math.round(basePricePerPerson * 4.8);
      totalPrice = privateRatePerCar * vehiclesNeeded;
      originalTotal = basePricePerPerson * guests * 1.25;
      tierLabel = `VIP Private 4x4 (${vehiclesNeeded} Exclusive Vehicle${vehiclesNeeded > 1 ? "s" : ""})`;
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
    <div className="bg-white dark:bg-[#1D150E] rounded-3xl border border-[#C89B3C]/30 shadow-xl overflow-hidden transition-all duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#17120D] via-[#2D1B0B] to-[#17120D] p-5 text-white border-b border-[#C89B3C]/30">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#E8C48A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8C48A]">
              Flexible Pricing Calculator
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[#E8C48A] text-[10px] font-extrabold uppercase">
            Best Deal Guarantee
          </span>
        </div>
        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
          Prices adjust dynamically based on your group size & car choice.
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* Guest / Quantity Selector */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#C89B3C]" />
              <span>{isPerVehicle ? "Number of Vehicles" : "Number of Guests / Persons"}</span>
            </label>
            <span className="text-xs font-bold text-[#C89B3C]">
              {guests} {isPerVehicle ? (guests > 1 ? "Vehicles" : "Vehicle") : (guests > 1 ? "Guests" : "Guest")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              disabled={guests <= 1}
              className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold hover:bg-amber-500 hover:text-slate-950 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-lg border border-slate-200 dark:border-slate-700"
              aria-label="Decrease guests"
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="flex-1 bg-[#FBF7F0] dark:bg-[#120D09] border border-[#C89B3C]/30 rounded-xl py-2.5 text-center">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {guests}
              </span>
              <span className="text-[10px] block text-slate-500 dark:text-slate-400 font-medium">
                {guests >= 6
                  ? "🎉 Super Group Discount Active"
                  : guests >= 3
                  ? "✨ Group Saver Discount Active"
                  : "Standard Rate"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(25, g + 1))}
              className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold hover:bg-amber-500 hover:text-slate-950 transition-colors text-lg border border-slate-200 dark:border-slate-700"
              aria-label="Increase guests"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sharing vs Private 4x4 Toggle (Only for tours, not standalone buggies) */}
        {!isPerVehicle && (
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
              <Car className="w-3.5 h-3.5 text-[#C89B3C]" />
              <span>Vehicle Arrangement</span>
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setVehicleType("sharing")}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all text-center ${
                  vehicleType === "sharing"
                    ? "bg-[#C89B3C] text-slate-950 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Sharing 4x4 Car
              </button>
              <button
                type="button"
                onClick={() => setVehicleType("private")}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all text-center ${
                  vehicleType === "private"
                    ? "bg-[#C89B3C] text-slate-950 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                VIP Private Car
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
              {vehicleType === "private"
                ? "Exclusive Land Cruiser for only you and your family/group (up to 6-7 seats per car)."
                : "Shared 4x4 seating with other friendly desert travelers."}
            </p>
          </div>
        )}

        {/* Live Calculation Display */}
        <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              Applied Tier:
            </span>
            <span className="font-extrabold text-amber-700 dark:text-amber-400">
              {tierLabel}
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-2 border-t border-amber-500/15">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                Total Flexible Rate
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                {totalSavings > 0 && (
                  <span className="text-sm font-semibold text-slate-400 line-through">
                    AED {originalTotal}
                  </span>
                )}
                <span className="text-2xl sm:text-3xl font-black text-[#FF6B00] dark:text-[#E8C48A]">
                  AED {totalPrice}
                </span>
              </div>
            </div>

            {totalSavings > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                Save AED {totalSavings}
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 flex items-center justify-between">
            <span>
              {vehicleType === "private"
                ? `Private car bundle (${guests} guests)`
                : `~ AED ${Math.round(totalPrice / guests)} per person`}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Free 24h Cancellation</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          {/* Direct Booking with Pre-filled guests */}
          <Link
            href={`/booking?package=${encodeURIComponent(pkg.id)}&adults=${guests}`}
            className="w-full py-2.5 px-3 rounded-lg bg-[#C89B3C] hover:bg-[#D6A84F] text-[#17120D] text-center text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Book This Flexible Rate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Negotiate / Inquire Custom Deal on WhatsApp */}
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 flex items-center justify-center gap-1.5 text-center"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Negotiate Custom Deal on WhatsApp</span>
          </a>
        </div>

        {/* Trust Guarantees */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Zero Advance Payment. Pay during pickup or on arrival.</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Got 10+ guests or corporate event? WhatsApp for special contract rates.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
