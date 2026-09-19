import Link from "next/link";
import { Sparkles, CheckCircle2, MessageCircle, ArrowRight, Flame } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function BogoPromoBanner() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    "Hello Safari Dune Tours! I'm interested in your *Buy 1 Get 1 Free Desert Safari* offer at *AED 79 for 2 Persons*. Please share today's availability and booking steps. Thank you!"
  );

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#FBF7F0] via-[#F5EAD9] to-[#FBF7F0] dark:from-[#17120D] dark:via-[#20160F] dark:to-[#17120D] transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1E112A] via-[#17120D] to-[#2B150A] border-2 border-[#C89B3C]/40 shadow-2xl p-6 sm:p-10 lg:p-12 text-white">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#FF6B00]/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#FF2E88]/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Offer Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF2E88] text-white text-xs font-black uppercase tracking-wider shadow-lg">
                    <Flame className="w-3.5 h-3.5 fill-white" />
                    <span>Special Limited Offer</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
                    ⚡ 47% OFF Today
                  </span>
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  Buy 1 Get 1 Free <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9800] via-[#FFC107] to-[#E8C48A]">
                    Dubai Desert Safari
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-xl">
                  Bring your partner, friend, or family member for free! Enjoy high-octane 4x4 Land Cruiser dune bashing, repeated camel rides, sandboarding, BBQ buffet dinner, and 7 sensational live shows under the Arabian stars.
                </p>

                {/* Offer Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {[
                    "Pay for 1, 2 Persons Attend (AED 79 Total)",
                    "Free Hotel Pickup & Drop-off in 4x4",
                    "Red Dune Bashing & Sandboarding",
                    "Grand BBQ Dinner (Veg & Non-Veg)",
                    "7 Live Shows (Belly Dance & Fire)",
                    "No Advance Card Needed to Book",
                  ].map((perk, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/40 flex items-center gap-2 hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-white/20" />
                    <span>Book on WhatsApp (Instant)</span>
                  </a>

                  <Link
                    href="/booking?package=pkg-bogo-safari"
                    className="btn-gold px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg hover:-translate-y-0.5"
                  >
                    Book Online Now
                  </Link>

                  <Link
                    href="/packages/buy-1-get-1-free-desert-safari"
                    className="text-xs font-semibold text-[#E8C48A] hover:underline flex items-center gap-1 ml-2"
                  >
                    <span>View Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Pricing Showcase Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 text-center space-y-4 shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#FF6B00]/30 rounded-full blur-xl" />

                  <span className="text-xs font-bold text-[#E8C48A] uppercase tracking-widest block">
                    All-Inclusive Package Deal
                  </span>

                  <div className="flex items-baseline justify-center gap-3">
                    <span className="text-gray-400 line-through text-lg font-bold">
                      AED 150
                    </span>
                    <span className="text-5xl font-black text-white tracking-tight drop-shadow-md">
                      AED 79
                    </span>
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[#E8C48A] text-xs font-bold uppercase tracking-wider">
                    Total for 02 Persons
                  </span>

                  <div className="text-xs text-gray-300 space-y-1.5 pt-3 border-t border-white/10">
                    <p>🕒 Pickup 3:00 PM – 4:00 PM</p>
                    <p>🏨 Complimentary Doorstep Hotel Transfers</p>
                    <p>⭐ 4.9/5 Rating by 2,000+ Guests</p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] text-amber-300 font-semibold flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Limited Daily Sunset Slots Available</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
