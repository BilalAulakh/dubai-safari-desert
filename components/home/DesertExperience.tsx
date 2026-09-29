import Link from "next/link";
import { Check, Compass, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl, optimizeImageUrl } from "@/lib/utils";
import ScrollReveal from "@/components/common/ScrollReveal";

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
    tag: "Golden Red Dunes",
  },
];

const col2Images = [
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    alt: "Authentic Bedouin camp at night",
    tag: "Bedouin Camp & Feast",
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=600&auto=format&fit=crop",
    alt: "Quad biking and buggy ride on red dunes",
    tag: "ATV Quad Biking",
  },
  {
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
    alt: "Live Arabic music and fire dance celebration",
    tag: "Live Tanoura & Fire Show",
  },
];

export default function DesertExperience() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    "Hello Safari Dune Tours, I would like to inquire about private group bookings and VIP packages."
  );

  return (
    <section className="py-20 sm:py-28 bg-[#FBF7F0] dark:bg-[#17120D] text-[#17120D] dark:text-[#FBF7F0] overflow-hidden border-t border-[#C89B3C]/15 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Editorial Luxury Image Composition */}
          <div className="relative">
            <div className="relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-[#C89B3C]/30 bg-[#17120D] group">
              <img
                src="/images/tours/private-morning-desert-safari-dubai.webp"
                alt="Dubai VIP private desert safari with 4x4 Land Cruiser"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17120D]/90 via-[#17120D]/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 rounded-full bg-[#17120D]/85 backdrop-blur-md text-[#E8C48A] text-xs font-semibold border border-[#C89B3C]/40 mb-2">
                  Lahbab Red Dunes
                </span>
                <p className="text-white font-heading text-lg sm:text-xl font-bold">
                  Breathtaking Dubai Desert Horizons
                </p>
              </div>
            </div>

            {/* Overlapping Floating Inset Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-60 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C89B3C]/40 bg-[#17120D] p-1.5 backdrop-blur-md">
              <div className="relative h-36 rounded-xl overflow-hidden">
                <img
                  src="/images/tours/atv-quad-bike-ride-dubai-1-person.webp"
                  alt="Quad biking and ATV adventure on red dunes"
                  width={300}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17120D]/80 to-transparent" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#17120D]/90 text-[#E8C48A] text-[10px] font-bold border border-[#C89B3C]/30">
                  ATV Dune Adventures
                </span>
              </div>
            </div>
          </div>

          {/* Description & Value Props */}
          <ScrollReveal delay={150}>
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#C89B3C] dark:text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-3">
                <Compass className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>Authentic Arabian Heritage</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight text-[#17120D] dark:text-[#FBF7F0] leading-[1.15]">
                A Desert Journey Crafted with <span className="gold-text-gradient">Passion & Precision</span>
              </h2>

              <p className="mt-3 text-sm sm:text-base text-[#6B6258] dark:text-[#B8ADA2] leading-relaxed max-w-xl">
                At Safari Dune Tours, we believe the desert is far more than vast golden sands—it is a timeless sanctuary of ancient Bedouin culture, serene sunset horizons, and exhilarating natural terrain.
              </p>

              <div className="mt-6 space-y-3 w-full">
                {[
                  "Safety-certified 4x4 Land Cruisers with internal safety roll-cages",
                  "Authentic Emirati welcome with traditional Gahwa and fresh Bateel dates",
                  "Hygiene-certified 5-star international BBQ buffets with vegetarian choices",
                  "Dedicated family-friendly vehicles and private VIP luxury charters",
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#C89B3C]/15 text-[#C89B3C] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-[#17120D]/90 dark:text-[#FBF7F0]/90 font-medium">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/booking"
                  className="btn-gold px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md"
                >
                  Book Your Experience
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-outline px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl !text-[#17120D] dark:!text-white border-[#C89B3C]/40 hover:border-[#C89B3C]"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500 mr-2" />
                  <span>Custom Group Inquiries</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
