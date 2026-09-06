import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";
import ContactForm from "@/components/contact/ContactForm";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact DubaiSafariDesert | Reservations & WhatsApp Support",
  description:
    "Contact our Dubai desert safari customer support team. Reach out via WhatsApp, phone, or online inquiry for instant tour bookings and assistance.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    "Hello DubaiSafariDesert, I would like to get in touch regarding desert tours."
  );

  return (
    <div className="bg-[#FCFBF8]">
      {/* Banner */}
      <section className="relative py-20 bg-[#0B0F17] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Phone className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Contact DubaiSafariDesert
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Have questions about tour timing, private vehicle charters, or custom group events? Our reservation team is available daily to assist you.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information & Channels */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                Direct Channels
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                Reach Out Directly
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                For fastest response, we strongly suggest messaging us on WhatsApp where our duty agent responds within minutes.
              </p>
            </div>

            <div className="space-y-4">
              {/* WhatsApp Card */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200/80 hover:bg-emerald-100/70 transition-colors flex items-start gap-4 block group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Chat on WhatsApp
                  </h4>
                  <p className="text-sm font-semibold text-emerald-800">
                    {SITE_CONFIG.contact.whatsapp}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Instant availability check & direct booking confirmation
                  </p>
                </div>
              </a>

              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Telephone Call</h4>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
                    className="text-sm font-semibold text-amber-700 hover:underline"
                  >
                    {SITE_CONFIG.contact.phone}
                  </a>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct line for reservations & safari pickups
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Email Address</h4>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="text-sm font-semibold text-amber-700 hover:underline"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                  <p className="text-xs text-slate-500 mt-1">
                    Inquiries, corporate events, and invoices
                  </p>
                </div>
              </div>

              {/* Address & Hours */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Office Location</h4>
                  <p className="text-sm text-slate-700">{SITE_CONFIG.contact.address}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{SITE_CONFIG.contact.supportHours}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form & Map Representation */}
          <div className="space-y-6">
            <ContactForm />

            {/* Google Maps Location representation (Zero heavy script / iframe) */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm h-56 relative bg-slate-100 flex items-center justify-center text-center p-6">
              <div className="space-y-2">
                <MapPin className="w-8 h-8 text-amber-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">Dubai Safari Desert Center</h4>
                <p className="text-xs text-slate-500">{SITE_CONFIG.contact.address}</p>
                <a
                  href={SITE_CONFIG.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs font-bold text-amber-700 hover:underline"
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
