import Link from "next/link";
import { Clock, Check, MessageCircle } from "lucide-react";
import { Package } from "@/types";
import { createWhatsAppUrl, optimizeImageUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config/site";
import { CARD_HIGHLIGHTS } from "@/lib/config/cardHighlights";

// Only the fields the card renders, so pages can avoid shipping full package records to the client
export type PackageCardData = Pick<
  Package,
  | "id"
  | "name"
  | "slug"
  | "short_description"
  | "price"
  | "original_price"
  | "per_unit"
  | "badges"
  | "duration"
  | "featured"
  | "active"
  | "main_image"
  | "inclusions"
>;

export function toPackageCardData(pkg: Package): PackageCardData {
  return {
    id: pkg.id,
    name: pkg.name,
    slug: pkg.slug,
    short_description: pkg.short_description,
    price: pkg.price,
    original_price: pkg.original_price,
    per_unit: pkg.per_unit,
    badges: pkg.badges,
    duration: pkg.duration,
    featured: pkg.featured,
    active: pkg.active,
    main_image: pkg.main_image,
    inclusions: cardHighlights(pkg),
  };
}

// Curated distinctive bullets when they still match the package, else the first three inclusions
function cardHighlights(pkg: Package): string[] {
  const curated = CARD_HIGHLIGHTS[pkg.slug];
  if (curated && curated.every((item) => pkg.inclusions.includes(item))) return [...curated];
  return pkg.inclusions.slice(0, 3);
}

interface PackageCardProps {
  pkg: PackageCardData;
  /** Set on the first visible cards only, so they don't wait for lazy loading */
  priority?: boolean;
}

export default function PackageCard({ pkg, priority = false }: PackageCardProps) {
  // Only meaningful discounts get a badge and a crossed-out price (threshold in site config)
  const discountPercent =
    pkg.original_price && pkg.original_price > pkg.price
      ? Math.round(((pkg.original_price - pkg.price) / pkg.original_price) * 100)
      : 0;
  const showDiscount = discountPercent >= SITE_CONFIG.promotions.discountBadgeMinPercent;
  // One badge at most: the discount when it qualifies, otherwise the package's lead badge
  const badge = showDiscount ? `Save ${discountPercent}%` : pkg.badges?.[0];

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
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dune-950/80 to-transparent" />

        {badge && (
          <span className="absolute left-4 top-4 rounded-full border border-amber-300/40 bg-dune-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-300 backdrop-blur-md">
            {badge}
          </span>
        )}

        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-small font-medium text-sand-50">
          <Clock className="h-4 w-4 text-amber-300" aria-hidden="true" />
          {pkg.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.375rem] font-semibold leading-snug text-ink">
          {/* Stretched link: the whole card opens the package page; buttons below sit above it */}
          <Link
            href={`/packages/${pkg.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-amber-600"
          >
            {pkg.name}
          </Link>
        </h3>

        {pkg.short_description && (
          <p className="mt-2.5 line-clamp-2 text-small text-muted">{pkg.short_description}</p>
        )}

        {pkg.inclusions.length > 0 && (
          <ul className="mb-6 mt-4 space-y-1.5">
            {pkg.inclusions.slice(0, 3).map((inc) => (
              <li key={inc} className="flex items-start gap-2.5 text-small text-ink/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-4 border-t border-line pt-5">
          <div>
            <p className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              From
              {showDiscount && (
                <span className="ml-2 font-normal normal-case tracking-normal text-muted line-through">AED {pkg.original_price}</span>
              )}
            </p>
            <p className="mt-0.5 whitespace-nowrap font-display text-[1.75rem] font-semibold leading-none lining-nums tabular-nums text-ink">AED {pkg.price}</p>
            <p className="mt-1 text-small text-muted">{pkg.per_unit || "per person"}</p>
          </div>
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
