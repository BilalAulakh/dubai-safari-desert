"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Package } from "@/types";
import { createWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config/site";

interface StickyBookingBarProps {
  pkg: Package;
}

export default function StickyBookingBar({ pkg }: StickyBookingBarProps) {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.packageInquiry(pkg.name)
  );

  // Tablet only: desktop has the sticky calculator beside the content and phones have the
  // site-wide bottom bar, so showing it there would cover the page or stack two bars
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 hidden border-t border-amber-500/20 bg-dune-900/95 px-4 py-3 shadow-2xl backdrop-blur-md sm:block lg:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-sand-50">{pkg.name}</p>
          <p className="text-xs text-sand-400">
            From <span className="font-heading text-lg font-semibold text-amber-300">AED {pkg.price}</span>{" "}
            {pkg.per_unit || "per person"}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-sm">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
          <Link href={`/booking?package=${encodeURIComponent(pkg.id)}`} className="btn-gold btn-sm" id="sticky-book-now-cta">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
