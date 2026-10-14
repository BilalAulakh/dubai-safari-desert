import Link from "next/link";
import { Clock, Check } from "lucide-react";
import { Package } from "@/types";
import { optimizeImageUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config/site";

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
    inclusions: pkg.inclusions.slice(0, 3),
  };
}

interface PackageCardProps {
  pkg: PackageCardData;
  /** Set on the first visible cards only, so they don't wait for lazy loading */
  priority?: boolean;
}

export default function PackageCard({ pkg, priority = false }: PackageCardProps) {
  // Discounts are reserved for a few promoted packages; everything else shows one clean price
  const isPromoted = SITE_CONFIG.promotions.discountBadgeSlugs.includes(pkg.slug);
  const hasDiscount = isPromoted && !!pkg.original_price && pkg.original_price > pkg.price;
  const discountPercent = hasDiscount
    ? Math.round(((pkg.original_price! - pkg.price) / pkg.original_price!) * 100)
    : null;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-line transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-soft)] hover:shadow-lift motion-safe:hover:-translate-y-1">
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

        {discountPercent && (
          <span className="absolute left-4 top-4 rounded-full bg-sand-50 px-3 py-1 text-label font-semibold uppercase text-dune-900">
            Save {discountPercent}%
          </span>
        )}

        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-small font-medium text-sand-50">
          <Clock className="h-4 w-4 text-gold-300" aria-hidden="true" />
          {pkg.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-h3 font-semibold text-ink">
          {/* Stretched link: the whole card opens the package page */}
          <Link
            href={`/packages/${pkg.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-gold-500"
          >
            {pkg.name}
          </Link>
        </h3>

        {pkg.inclusions.length > 0 && (
          <ul className="mb-6 mt-4 space-y-2">
            {pkg.inclusions.slice(0, 3).map((inc) => (
              <li key={inc} className="flex items-start gap-2.5 text-small text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
          <div className="min-w-0">
            <p className="text-label uppercase text-muted">
              From
              {hasDiscount && (
                <span className="ml-2 normal-case tracking-normal line-through">AED {pkg.original_price}</span>
              )}
            </p>
            <p className="font-display text-h3 font-semibold lining-nums tabular-nums text-ink">AED {pkg.price}</p>
            <p className="truncate text-small text-muted">{pkg.per_unit || "per person"}</p>
          </div>
          <Link
            href={`/booking?package=${encodeURIComponent(pkg.id)}`}
            className="btn-gold relative z-10 shrink-0"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
