import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl, toInternationalPhone } from "@/lib/utils";

export default function Footer() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.general
  );

  return (
    <footer className="bg-[#F2E8D5] text-[#5E554C] dark:bg-[#0E0A07] dark:text-[#B8ADA2] border-t border-[#C89B3C]/30 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#8C6214]/15 dark:border-[#C89B3C]/10">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/images/logo-emblem-96.webp"
                alt=""
                width={56}
                height={56}
                loading="lazy"
                className="w-14 h-14 object-contain group-hover:scale-105 transition-transform duration-300 dark:hidden"
              />
              <img
                src="/images/logo-emblem-dark-96.webp"
                srcSet="/images/logo-emblem-dark-96.webp 1x, /images/logo-emblem-dark-192.webp 2x"
                alt=""
                width={56}
                height={56}
                loading="lazy"
                className="hidden w-14 h-14 object-contain group-hover:scale-105 transition-transform duration-300 dark:block"
              />
              <div className="flex flex-col">
                <span className="font-heading text-xl font-extrabold tracking-tight text-[#17120D] dark:text-white group-hover:text-[#8C6214] dark:group-hover:text-[#E8C48A] transition-colors leading-none">
                  Safari Dune <span className="text-[#B58428] dark:text-[#C89B3C]">Tours</span>
                </span>
                <span className="mt-1.5 text-[9px] tracking-[0.2em] text-[#8C6214] dark:text-[#E8C48A]/80 uppercase font-medium">
                  {SITE_CONFIG.tagline}
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed">
              Experience Dubai&apos;s most authentic desert safari adventures with Safari Dune Tours. Enjoy thrilling dune bashing, camel rides, sandboarding, 5-star BBQ buffets, and starlight hospitality.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#8C6214] dark:text-[#E8C48A] pt-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#B58428] dark:text-[#C89B3C] shrink-0" />
              <span>Experienced Safari Drivers & Authentic Hospitality</span>
            </div>
          </div>

          {/* Col 2: Safari Packages */}
          <div>
            <h4 className="text-[#8C6214] dark:text-[#E8C48A] text-xs font-bold uppercase tracking-widest mb-4">
              Safari Packages
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/packages/evening-desert-safari"
                  className="hover:text-[#8C6214] dark:hover:text-[#E8C48A] transition-colors"
                >
                  Evening Desert Safari & BBQ
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/morning-desert-safari"
                  className="hover:text-[#8C6214] dark:hover:text-[#E8C48A] transition-colors"
                >
                  Morning Desert Safari & Sunrise
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/overnight-desert-safari"
                  className="hover:text-[#8C6214] dark:hover:text-[#E8C48A] transition-colors"
                >
                  Overnight Starlight Desert Camp
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/vip-private-desert-safari-dubai"
                  className="hover:text-[#8C6214] dark:hover:text-[#E8C48A] transition-colors"
                >
                  VIP Private Safari Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/packages?category=adrenaline"
                  className="hover:text-[#8C6214] dark:hover:text-[#E8C48A] transition-colors"
                >
                  Quad Bike & Dune Buggy Tour
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-[#8C6214] dark:text-[#E8C48A] text-xs font-bold uppercase tracking-widest mb-4">
              Explore & Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/activities" className="hover:text-[#8C6214] dark:hover:text-[#E8C48A] transition-colors">
                  Desert Activities
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#8C6214] dark:hover:text-[#E8C48A] transition-colors">
                  Photo & Video Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#8C6214] dark:hover:text-[#E8C48A] transition-colors">
                  About Our Company
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-[#8C6214] dark:hover:text-[#E8C48A] transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#8C6214] dark:hover:text-[#E8C48A] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#8C6214] dark:hover:text-[#E8C48A] transition-colors">
                  Safari Travel Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#8C6214] dark:hover:text-[#E8C48A] transition-colors">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 className="text-[#8C6214] dark:text-[#E8C48A] text-xs font-bold uppercase tracking-widest mb-4">
              Dubai Office & Bookings
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B58428] dark:text-[#C89B3C] mt-0.5 shrink-0" />
                <span>{SITE_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B58428] dark:text-[#C89B3C] shrink-0" />
                <a
                  href={`tel:${toInternationalPhone(SITE_CONFIG.contact.phone)}`}
                  className="hover:text-[#17120D] dark:hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium transition-colors"
                >
                  WhatsApp: {SITE_CONFIG.contact.whatsapp}
                </a>
              </li>
              {SITE_CONFIG.contact.email ? (
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#B58428] dark:text-[#C89B3C] shrink-0" />
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="hover:text-[#17120D] dark:hover:text-white transition-colors"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </li>
              ) : null}
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#B58428] dark:text-[#C89B3C] shrink-0" />
                <span className="text-xs">{SITE_CONFIG.contact.supportHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5E554C]/80 dark:text-[#B8ADA2]/70">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Dubai, United Arab Emirates</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
