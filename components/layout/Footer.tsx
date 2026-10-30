import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl, toInternationalPhone } from "@/lib/utils";

const PACKAGE_LINKS = [
  { label: "Evening Desert Safari & BBQ", href: "/packages/evening-desert-safari" },
  { label: "Morning Desert Safari & Sunrise", href: "/packages/morning-desert-safari" },
  { label: "Overnight Starlight Desert Camp", href: "/packages/overnight-desert-safari" },
  { label: "VIP Private Safari Experience", href: "/packages/vip-private-desert-safari-dubai" },
  { label: "Quad Bike & Dune Buggy Tours", href: "/packages?category=adrenaline" },
];

const COMPANY_LINKS = [
  { label: "Desert Activities", href: "/activities" },
  { label: "Photo & Video Gallery", href: "/gallery" },
  { label: "About Our Company", href: "/about" },
  { label: "Customer Reviews", href: "/reviews" },
  { label: "Frequently Asked Questions", href: "/faq" },
  { label: "Safari Travel Guides", href: "/blog" },
  { label: "Contact & Location", href: "/contact" },
];

const heading = "mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300";
const link = "text-sand-400 transition-colors hover:text-amber-300";

// Always night navy in both themes, so the page ends on the brand colour
export default function Footer() {
  const whatsappUrl = createWhatsAppUrl(SITE_CONFIG.contact.whatsapp, SITE_CONFIG.whatsappTemplates.general);

  return (
    <footer className="border-t border-amber-500/20 bg-dune-950 pb-10 pt-16 text-sand-400 sm:pt-20">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="group flex items-center gap-3">
              <img
                src="/images/logo-emblem.svg"
                alt=""
                width={56}
                height={56}
                loading="lazy"
                className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-brand text-2xl font-semibold leading-none text-sand-50">
                  Safari Dune <span className="text-amber-300">Tours</span>
                </span>
                <span className="mt-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-amber-300/80">
                  {SITE_CONFIG.tagline}
                </span>
              </div>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed">
              Dubai desert safaris with experienced drivers: dune bashing, camel rides, sandboarding, BBQ dinners and
              nights under the stars.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-sm">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          <nav aria-label="Safari packages">
            <h4 className={heading}>Safari Packages</h4>
            <ul className="space-y-3 text-sm">
              {PACKAGE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h4 className={heading}>Explore</h4>
            <ul className="space-y-3 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className={heading}>Dubai Office &amp; Bookings</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                <span>{SITE_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                <a href={`tel:${toInternationalPhone(SITE_CONFIG.contact.phone)}`} className={link}>
                  {toInternationalPhone(SITE_CONFIG.contact.phone)}
                </a>
              </li>
              {SITE_CONFIG.contact.email ? (
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                  <a href={`mailto:${SITE_CONFIG.contact.email}`} className={`${link} break-all`}>
                    {SITE_CONFIG.contact.email}
                  </a>
                </li>
              ) : null}
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                <span>{SITE_CONFIG.contact.supportHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-sand-400/70 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <span>All prices in AED</span>
            <Link href="/admin/login" className="transition-colors hover:text-amber-300" rel="nofollow">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
