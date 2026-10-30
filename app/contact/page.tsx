import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl, toInternationalPhone } from "@/lib/utils";
import ContactForm from "@/components/contact/ContactForm";

export const revalidate = 86400; // 1 day; admin saves refresh pages on demand

export const metadata: Metadata = {
  title: "Contact Safari Dune Tours | Reservations & WhatsApp Support",
  description:
    "Contact Safari Dune Tours customer support team. Reach out via WhatsApp, phone, or online inquiry for instant tour bookings and assistance in Dubai.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
  openGraph: {
    title: "Contact Safari Dune Tours | Reservations & WhatsApp Support",
    description:
      "Contact Safari Dune Tours customer support team. Reach out via WhatsApp, phone, or online inquiry for instant tour bookings and assistance in Dubai.",
    url: `${SITE_CONFIG.url}/contact`,
    siteName: SITE_CONFIG.name,
  },
};

export default function ContactPage() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    "Hello Safari Dune Tours, I would like to get in touch regarding desert tours."
  );

  return (
    <div className="bg-[#FBF7F0] dark:bg-[#17120D] text-[#17120D] dark:text-[#FBF7F0] transition-colors duration-200">
      {/* Banner */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 bg-[#17120D] text-white border-b border-[#C89B3C]/20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C89B3C] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Phone className="w-3.5 h-3.5 text-[#8C6214] dark:text-[#E8C48A]" />
            <span>Reservations & Support</span>
          </div>
          <h1 className="font-heading text-h1 font-extrabold text-white max-w-4xl mx-auto">
            Contact <span className="gold-text-gradient">Safari Dune Tours</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#B8ADA2] max-w-2xl mx-auto leading-relaxed">
            Have questions about tour timing, private vehicle charters, or custom group events? Our reservation team is available daily to assist you.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information & Channels */}
          <div className="space-y-8">
            <div>
              <span className="eyebrow">
                Direct Channels
              </span>
              <h2 className="font-heading text-h2 font-bold text-[#17120D] dark:text-[#FBF7F0] mt-1">
                Reach Out Directly
              </h2>
              <p className="mt-2 text-sm text-[#5E554C] dark:text-[#B8ADA2]">
                For the fastest response, message us on WhatsApp where our reservation agents respond promptly.
              </p>
            </div>

            <div className="space-y-4">
              {/* WhatsApp Card */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-white dark:bg-[#241A12] border border-emerald-500/30 hover:border-emerald-500 shadow-sm transition-all flex items-start gap-4 block group hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-[#17120D] dark:text-[#FBF7F0] group-hover:text-emerald-500 transition-colors">
                    Chat on WhatsApp
                  </h4>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    {SITE_CONFIG.contact.whatsapp}
                  </p>
                  <p className="text-xs text-[#5E554C] dark:text-[#B8ADA2] mt-1">
                    Instant availability check & direct booking confirmation
                  </p>
                </div>
              </a>

              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#241A12] border border-[#C89B3C]/20 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C89B3C]/15 text-[#8C6214] dark:text-[#E8C48A] flex items-center justify-center shrink-0 border border-[#C89B3C]/30">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-[#17120D] dark:text-[#FBF7F0]">Telephone Call</h4>
                  <a
                    href={`tel:${toInternationalPhone(SITE_CONFIG.contact.phone)}`}
                    className="text-sm font-semibold text-[#8C6214] dark:text-[#E8C48A] hover:underline"
                  >
                    {SITE_CONFIG.contact.phone}
                  </a>
                  <p className="text-xs text-[#5E554C] dark:text-[#B8ADA2] mt-1">
                    Direct line for reservations & safari pickups
                  </p>
                </div>
              </div>

              {/* Email / Online Inquiries Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#241A12] border border-[#C89B3C]/20 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C89B3C]/15 text-[#8C6214] dark:text-[#E8C48A] flex items-center justify-center shrink-0 border border-[#C89B3C]/30">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-[#17120D] dark:text-[#FBF7F0]">Email & Inquiries</h4>
                  {SITE_CONFIG.contact.email ? (
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="text-sm font-semibold text-[#8C6214] dark:text-[#E8C48A] hover:underline"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-[#17120D] dark:text-[#FBF7F0]">
                      Direct online booking & quote inquiries
                    </p>
                  )}
                  <p className="text-xs text-[#5E554C] dark:text-[#B8ADA2] mt-1">
                    Corporate bookings, private charters, and invoice requests
                  </p>
                </div>
              </div>

              {/* Address & Hours */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#241A12] border border-[#C89B3C]/20 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C89B3C]/15 text-[#8C6214] dark:text-[#E8C48A] flex items-center justify-center shrink-0 border border-[#C89B3C]/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-[#17120D] dark:text-[#FBF7F0]">Office Location</h4>
                  <p className="text-sm text-[#17120D]/90 dark:text-[#FBF7F0]/90">{SITE_CONFIG.contact.address}</p>
                  <p className="text-xs text-[#5E554C] dark:text-[#B8ADA2] mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#8C6214] dark:text-[#E8C48A]" />
                    <span>{SITE_CONFIG.contact.supportHours}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form & Map Representation */}
          <div className="space-y-6">
            <ContactForm />

            {/* Google Maps Location Representation */}
            <div className="rounded-2xl overflow-hidden border border-[#C89B3C]/30 shadow-md relative bg-[#17120D] text-white p-7 flex flex-col justify-between">
              <div className="space-y-2 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[#E8C48A] text-xs font-semibold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#8C6214] dark:text-[#E8C48A]" />
                  <span>Google Maps Location</span>
                </div>
                <h4 className="font-heading font-bold text-lg text-white pt-1">
                  Safari Dune Tours Center
                </h4>
                <p className="text-xs text-[#B8ADA2] leading-relaxed max-w-sm">
                  {SITE_CONFIG.contact.address}
                </p>
              </div>

              <div className="pt-6 relative z-10">
                <a
                  href={SITE_CONFIG.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  <span>Open in Google Maps</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
