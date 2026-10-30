import Link from "next/link";
import { ArrowRight, Check, Clock, MessageCircle } from "lucide-react";
import { Package } from "@/types";
import { createWhatsAppUrl, optimizeImageUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config/site";

// Only what the card shows: image, title, duration, a few inclusions, price and the actions
export type PackageCardData = Pick<Package, "id" | "name" | "slug" | "price" | "original_price" | "duration" | "main_image"> & {
  included: string[];
};

const CARD_INCLUDED_COUNT = 4;

// Lines in the inclusions list that are schedule or offer details, not things you get
const NOT_AN_INCLUSION = /^(early\s+)?pickup time|availability|buy 1 get 1/i;

/** Up to four short "what's included" lines, taken from the package's own data */
export function cardIncluded(pkg: Pick<Package, "highlights" | "inclusions">): string[] {
  const source = pkg.highlights && pkg.highlights.length > 0 ? pkg.highlights : pkg.inclusions || [];
  const lines = source
    .filter((item) => item && !NOT_AN_INCLUSION.test(item.trim()))
    // "Camel Ride (Can be repeated)" -> "Camel Ride": the card has room for the headline only
    .map((item) => item.replace(/\s*\([^)]*\)/g, "").trim())
    .filter(Boolean);
  return Array.from(new Set(lines)).slice(0, CARD_INCLUDED_COUNT);
}

export function toPackageCardData(pkg: Package): PackageCardData {
  return {
    id: pkg.id,
    name: pkg.name,
    slug: pkg.slug,
    price: pkg.price,
    original_price: pkg.original_price,
    duration: pkg.duration,
    main_image: pkg.main_image,
    included: cardIncluded(pkg),
  };
}

interface PackageCardProps {
  pkg: PackageCardData;
  /** Set on the first visible cards only, so they don't wait for lazy loading */
  priority?: boolean;
}

export default function PackageCard({ pkg, priority = false }: PackageCardProps) {
  // Only discounts at or above the site-wide threshold get a badge
  const discountPercent =
    pkg.original_price && pkg.original_price > pkg.price
      ? Math.round(((pkg.original_price - pkg.price) / pkg.original_price) * 100)
      : 0;
  const showDiscount = discountPercent >= SITE_CONFIG.promotions.discountBadgeMinPercent;

  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.packageInquiry(pkg.name)
  );

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-line transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-soft)] hover:shadow-glow-amber hover:ring-transparent motion-safe:hover:-translate-y-1">
      {/* Image: fixed 4:3 box so nothing shifts while it loads */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-dune-900">
        <img
          src={optimizeImageUrl(pkg.main_image, 800)}
          alt={pkg.name}
          width={800}
          height={600}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] motion-safe:group-hover:scale-[1.03]"
        />
        {showDiscount && (
          <span className="absolute left-4 top-4 rounded-full border border-amber-300/40 bg-dune-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-300 backdrop-blur-md">
            Save {discountPercent}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-h3 font-bold text-ink">
          {/* Stretched link: the whole card opens the package page; the buttons below sit above it */}
          <Link
            href={`/packages/${pkg.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-accent-500"
          >
            {pkg.name}
          </Link>
        </h3>

        <p className="mt-2.5 inline-flex items-center gap-1.5 text-small text-muted">
          <Clock className="h-4 w-4 text-accent-500" aria-hidden="true" />
          <span>{pkg.duration}</span>
        </p>

        {pkg.included.length > 0 && (
          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">What&apos;s included</p>
            <ul className="mt-2.5 space-y-1.5">
              {pkg.included.map((item) => (
                <li key={item} className="flex items-start gap-2 text-small text-ink/85">
                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
                  <span className="line-clamp-1" title={item}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sits above the stretched link so it gets its own focus ring; same destination */}
        <Link
          href={`/packages/${pkg.slug}`}
          className="link-arrow relative z-10 mb-2 mt-1.5 min-h-11 self-start text-small"
          aria-label={`View details: ${pkg.name}`}
        >
          <span>View details</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-4 border-t border-line pt-5">
          <p className="whitespace-nowrap font-display text-[1.375rem] font-bold leading-none lining-nums tabular-nums text-ink">
            From AED {pkg.price}
          </p>
          <div className="relative z-10 ml-auto flex shrink-0 items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-whatsapp-500/12 text-whatsapp-700 ring-1 ring-whatsapp-500/35 transition-colors hover:bg-whatsapp-700 hover:text-white dark:text-whatsapp-500 dark:hover:text-white"
              aria-label={`WhatsApp us about ${pkg.name}`}
              title="WhatsApp us"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
            <Link href={`/booking?package=${encodeURIComponent(pkg.id)}`} className="btn-gold btn-sm">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
