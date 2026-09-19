import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

export default function Footer() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.general
  );

  return (
    <footer className="bg-[#17120D] text-[#B8ADA2] border-t border-[#C89B3C]/20 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#241A12]">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#C89B3C]/50 via-[#241A12] to-[#17120D] p-0.5 shadow-[0_2px_12px_rgba(200,155,60,0.3)] group-hover:scale-105 transition-all duration-300">
                <div className="w-full h-full rounded-[10px] bg-[#17120D] flex items-center justify-center p-1">
                  <Image
                    src="/images/logo-emblem.png"
                    alt="Safari Dune Tours"
                    width={44}
                    height={44}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-[#E8C48A] transition-colors">
                  Safari Dune <span className="text-[#C89B3C]">Tours</span>
                </span>
                <span className="text-[9px] tracking-[0.2em] text-[#E8C48A]/80 uppercase font-medium">
                  {SITE_CONFIG.tagline}
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-[#B8ADA2]">
              Experience Dubai&apos;s most authentic desert safari adventures with Safari Dune Tours. Enjoy thrilling dune bashing, camel rides, sandboarding, 5-star BBQ buffets, and starlight hospitality.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E8C48A] pt-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#C89B3C] shrink-0" />
              <span>Experienced Safari Drivers & Authentic Hospitality</span>
            </div>
          </div>

          {/* Col 2: Safari Packages */}
          <div>
            <h4 className="text-[#E8C48A] text-xs font-bold uppercase tracking-widest mb-4">
              Safari Packages
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/packages/evening-desert-safari"
                  className="hover:text-[#E8C48A] transition-colors"
                >
                  Evening Desert Safari & BBQ
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/morning-desert-safari"
                  className="hover:text-[#E8C48A] transition-colors"
                >
                  Morning Desert Safari & Sunrise
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/overnight-desert-safari"
                  className="hover:text-[#E8C48A] transition-colors"
                >
                  Overnight Starlight Desert Camp
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/private-desert-safari"
                  className="hover:text-[#E8C48A] transition-colors"
                >
                  VIP Private Safari Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/quad-bike-desert-safari"
                  className="hover:text-[#E8C48A] transition-colors"
                >
                  Quad Bike & Dune Buggy Tour
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-[#E8C48A] text-xs font-bold uppercase tracking-widest mb-4">
              Explore & Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/activities" className="hover:text-[#E8C48A] transition-colors">
                  Desert Activities
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#E8C48A] transition-colors">
                  Photo & Video Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#E8C48A] transition-colors">
                  About Our Company
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-[#E8C48A] transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#E8C48A] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#E8C48A] transition-colors">
                  Safari Travel Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E8C48A] transition-colors">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 className="text-[#E8C48A] text-xs font-bold uppercase tracking-widest mb-4">
              Dubai Office & Bookings
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C89B3C] mt-0.5 shrink-0" />
                <span>{SITE_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C89B3C] shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  WhatsApp: {SITE_CONFIG.contact.whatsapp}
                </a>
              </li>
              {SITE_CONFIG.contact.email ? (
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C89B3C] shrink-0" />
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </li>
              ) : null}
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C89B3C] shrink-0" />
                <span className="text-xs">{SITE_CONFIG.contact.supportHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8ADA2]/70">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Dubai, United Arab Emirates</span>
            <Link
              href="/admin/login"
              onClick={() => {
                if (typeof window !== "undefined") {
                  sessionStorage.removeItem("admin_auth");
                  localStorage.removeItem("admin_auth");
                  document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }
              }}
              className="hover:text-[#E8C48A] transition-colors cursor-pointer"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
