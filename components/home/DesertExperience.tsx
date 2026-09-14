import Link from "next/link";
import { Check, Compass, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl, optimizeImageUrl } from "@/lib/utils";

const col1Images = [
  {
    src: "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=600&auto=format&fit=crop",
    alt: "Dubai 4x4 dune bashing adventure",
    tag: "4x4 Dune Bashing",
  },
  {
    src: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=600&auto=format&fit=crop",
    alt: "Sunset camel caravan in Dubai",
    tag: "Sunset Camel Trek",
  },
  {
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop",
    alt: "Arabian golden desert landscape",
    tag: "Golden Dunes",
  },
];

const col2Images = [
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    alt: "Authentic Bedouin camp at night",
    tag: "Bedouin Night Camp",
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=600&auto=format&fit=crop",
    alt: "Quad biking and buggy ride on red dunes",
    tag: "ATV Quad Biking",
  },
  {
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
    alt: "Live Arabic music and fire dance celebration",
    tag: "Live Shows & BBQ",
  },
];

export default function DesertExperience() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    "Hello DubaiSafariDesert, I would like to inquire about private group bookings and VIP packages."
  );

  return (
    <section className="py-14 sm:py-16 bg-[#FCFBF8] dark:bg-[#0B0F17] text-slate-900 dark:text-white overflow-hidden border-t border-amber-900/10 dark:border-amber-500/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Animated Scrolling Image Collage */}
          <div className="relative h-[400px] sm:h-[460px] overflow-hidden rounded-2xl bg-gradient-to-b from-amber-500/5 via-transparent to-amber-500/5 p-1 border border-amber-900/15 dark:border-amber-500/15">
            {/* Top & Bottom Gradient Masks for seamless continuous scroll effect */}
            <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#FCFBF8] dark:from-[#0B0F17] via-[#FCFBF8]/80 dark:via-[#0B0F17]/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#FCFBF8] dark:from-[#0B0F17] via-[#FCFBF8]/80 dark:via-[#0B0F17]/80 to-transparent z-10 pointer-events-none" />

            <div className="grid grid-cols-2 gap-3 sm:gap-4 h-full">
              {/* Column 1 - Smooth upward scroll */}
              <div className="flex flex-col gap-3 sm:gap-4 animate-scroll-up">
                {[...col1Images, ...col1Images].map((img, idx) => (
                  <div
                    key={`col1-${idx}`}
                    className="relative h-44 sm:h-52 rounded-xl overflow-hidden shadow-lg border border-amber-500/20 group shrink-0 bg-slate-900"
                  >
                    <img
                      src={optimizeImageUrl(img.src, 500)}
                      alt={img.alt}
                      width={400}
                      height={280}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-amber-300 text-[10px] font-bold border border-amber-500/30">
                        {img.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2 - Smooth downward scroll */}
              <div className="flex flex-col gap-3 sm:gap-4 animate-scroll-down">
                {[...col2Images, ...col2Images].map((img, idx) => (
                  <div
                    key={`col2-${idx}`}
                    className="relative h-44 sm:h-52 rounded-xl overflow-hidden shadow-lg border border-amber-500/20 group shrink-0 bg-slate-900"
                  >
                    <img
                      src={optimizeImageUrl(img.src, 500)}
                      alt={img.alt}
                      width={400}
                      height={280}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-amber-300 text-[10px] font-bold border border-amber-500/30">
                        {img.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description & Value Props */}
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 mb-2.5">
              <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                Authentic Arabian Heritage
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              A Desert Journey Crafted with <span className="gold-text-gradient">Passion & Precision</span>
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300/90 leading-relaxed max-w-xl">
              At DubaiSafariDesert, we believe the desert is more than sand dunes—it is a timeless sanctuary of ancient Bedouin culture, serene golden horizons, and exhilarating natural terrain.
            </p>

            <div className="mt-5 space-y-2.5 w-full">
              {[
                "Carefully maintained, safety-certified 4x4 Land Cruisers",
                "Authentic Emirati welcome with Gahwa and Bateel dates",
                "Fresh, hygiene-certified 5-star international BBQ buffets",
                "Dedicated family-friendly and private VIP vehicle seating",
              ].map((perk, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 font-medium">
                    {perk}
                  </span>
                </div>
              ))}
            </div>

            {/* Compact Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/booking"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 text-center"
              >
                Book Your Experience
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white font-semibold text-xs sm:text-sm border border-slate-300 dark:border-white/20 transition-all hover:scale-105 active:scale-95 text-center"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Custom Group Inquiries</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
