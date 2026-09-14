import Link from "next/link";
import { Compass, Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

export default function Footer() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.general
  );

  return (
    <footer className="bg-slate-100 dark:bg-[#0B0F17] text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-amber-500/20 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-200 dark:border-white/10">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5 text-amber-100" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Dubai<span className="text-amber-500">Safari</span>Desert
                </span>
                <span className="text-[9px] tracking-widest text-amber-700 dark:text-amber-300/70 uppercase font-bold">
                  Premium Desert Tourism
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {SITE_CONFIG.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400/90 pt-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
              <span>Licensed Safari Marshals & Insured 4x4 Fleet</span>
            </div>
          </div>

          {/* Col 2: Safari Packages */}
          <div>
            <h4 className="text-slate-900 dark:text-amber-400 text-sm font-bold uppercase tracking-wider mb-4">
              Safari Tours
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/packages/evening-desert-safari"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Evening Desert Safari with BBQ
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/morning-desert-safari"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Morning Desert Safari & Sunrise
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/overnight-desert-safari"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Overnight Desert Safari Camp
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/private-desert-safari"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  VIP Private Safari Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/quad-bike-desert-safari"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Quad Bike & Dune Buggy Tour
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-slate-900 dark:text-amber-400 text-sm font-bold uppercase tracking-wider mb-4">
              Explore & Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/activities" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Desert Activities
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Photo & Video Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  About Our Company
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Dubai Desert Travel Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & WhatsApp */}
          <div>
            <h4 className="text-slate-900 dark:text-amber-400 text-sm font-bold uppercase tracking-wider mb-4">
              Dubai Office & Bookings
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
                <span>{SITE_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors"
                >
                  WhatsApp: {SITE_CONFIG.contact.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
                <span className="text-xs">{SITE_CONFIG.contact.supportHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Dubai, UAE</span>
            <Link href="/admin" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
