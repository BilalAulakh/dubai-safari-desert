import Link from "next/link";
import { Check, Compass, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

export default function DesertExperience() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    "Hello DubaiSafariDesert, I would like to inquire about private group bookings and VIP packages."
  );

  return (
    <section className="py-20 bg-[#0B0F17] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Collage */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20">
              <img
                src="https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=800&auto=format&fit=crop"
                alt="Dubai 4x4 dune bashing"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20 mt-8">
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop"
                alt="Arabian desert camp at dusk"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20 -mt-8">
              <img
                src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop"
                alt="Desert camel trek at sunset"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20">
              <img
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"
                alt="Spectacular live fire dance in Dubai desert"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Description & Value Props */}
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Authentic Arabian Heritage
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              A Desert Journey Crafted with Passion & Precision
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              At DubaiSafariDesert, we believe the desert is more than sand dunes—it is a timeless sanctuary of ancient Bedouin culture, serene golden horizons, and exhilarating natural terrain.
            </p>

            <div className="mt-6 space-y-3 w-full">
              {[
                "Carefully maintained, safety-certified 4x4 Land Cruisers",
                "Authentic Emirati welcome with Gahwa and Bateel dates",
                "Fresh, hygiene-certified 5-star international BBQ buffets",
                "Dedicated family-friendly and private VIP vehicle seating",
              ].map((perk, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-slate-200">{perk}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all"
              >
                Book Your Experience
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Custom Group Inquiries</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
