import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  Clock,
  MapPin,
  ShieldCheck,
  Check,
  X,
  ArrowRight,
  MessageCircle,
  Info,
  Star,
} from "lucide-react";
import { getPackageBySlug, getPackages } from "@/lib/data/store";
import PackageGallery from "@/components/packages/PackageGallery";
import { formatPrice, createWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config/site";
import { PACKAGE_FILTERS } from "@/lib/config/packageGroups";
import StickyBookingBar from "@/components/packages/StickyBookingBar";
import FlexiblePriceCalculator from "@/components/packages/FlexiblePriceCalculator";
import PackageCard, { toPackageCardData } from "@/components/packages/PackageCard";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const revalidate = 86400; // 1 day; admin saves refresh pages on demand

interface PackagePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const packages = await getPackages();
  return packages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);

  if (!pkg || !pkg.active) {
    return {
      title: "Package Not Found | Safari Dune Tours",
      robots: { index: false, follow: false },
    };
  }

  const baseTitle = pkg.seo_title || pkg.name;
  const title = baseTitle.includes(SITE_CONFIG.name) ? baseTitle : `${baseTitle} | ${SITE_CONFIG.name}`;
  const description =
    pkg.seo_description || `${pkg.short_description} Starting from ${formatPrice(pkg.price)} per person.`;
  const canonicalUrl = `${SITE_CONFIG.url}/packages/${pkg.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: pkg.main_image,
          width: 1200,
          height: 630,
          alt: pkg.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [pkg.main_image],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// Plain section title used down the left column
function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mb-4 font-display text-xl font-bold leading-tight text-ink">
      {children}
    </h2>
  );
}

export default async function PackageDetailPage({ params }: PackagePageProps) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);

  // Inactive (hidden in admin) packages have no public page
  if (!pkg || !pkg.active) {
    notFound();
  }

  const allPackages = await getPackages();

  // "You may also like": same browsing group first, then anything else, never this package
  const group = PACKAGE_FILTERS.find((f) => f.matches(pkg));
  const others = allPackages.filter((p) => p.active && p.slug !== pkg.slug);
  const related = [
    ...others.filter((p) => group?.matches(p)),
    ...others.filter((p) => !group?.matches(p)),
  ].slice(0, 3);

  // Photos: main photo first, then the gallery, no repeats
  const allPhotos = Array.from(new Set([pkg.main_image, ...(pkg.gallery || [])].filter(Boolean)));

  // Only claim hotel pickup when the package includes it (buggy and quad pickup is an add-on)
  const pickupLine = pkg.inclusions.find((i) => /pickup/i.test(i));
  const includesPickup = Boolean(pickupLine && !/on demand|optional|add-on/i.test(pickupLine));

  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.packageInquiry(pkg.name)
  );

  const tripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.name,
    description: pkg.short_description,
    image: pkg.main_image,
    touristType: ["Adventure Tourism", "Cultural Tourism"],
    offers: {
      "@type": "Offer",
      price: pkg.price,
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
      url: `${SITE_CONFIG.url}/packages/${pkg.slug}`,
    },
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  const listItem = "flex items-start gap-3 text-[0.9375rem] leading-relaxed";

  return (
    <div className="bg-page text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }} />

      <div className="container-page pb-12 pt-24 sm:pb-16 sm:pt-28">
        {/* ── Header: name and key facts (price lives in the booking panel) ── */}
        <header className="mb-6">
          <Breadcrumbs
            tone="light"
            items={[{ label: "Safari Packages", href: "/packages" }, { label: pkg.name }]}
            className="mb-1"
          />
          <h1 className="font-display text-[clamp(1.5rem,1.3rem+0.9vw,2.125rem)] font-bold leading-tight tracking-tight text-ink">
            {pkg.name}
          </h1>
          <ul className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            {pkg.rating ? (
              <li className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                <span className="font-semibold text-ink">{pkg.rating.toFixed(1)}</span>
                {pkg.review_count ? <span>({pkg.review_count} reviews)</span> : null}
              </li>
            ) : null}
            <li className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-amber-500" aria-hidden="true" />
              {pkg.duration}
            </li>
            {includesPickup && (
              <li className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-amber-500" aria-hidden="true" />
                Hotel pickup included
              </li>
            )}
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-amber-500" aria-hidden="true" />
              Pay on the day
            </li>
          </ul>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-12">
          {/* Content column: gallery, then plain sections split by thin lines */}
          <div className="min-w-0">
            {allPhotos.length > 0 && <PackageGallery all={allPhotos} name={pkg.name} />}

            <div className="mt-8 divide-y divide-line [&>*]:py-8 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0">
              {/* Overview + highlights */}
              <section aria-labelledby="overview-heading">
                <SectionTitle id="overview-heading">About this experience</SectionTitle>
                <p className="whitespace-pre-line text-[0.9375rem] leading-relaxed text-ink/80">{pkg.description}</p>
                {pkg.highlights && pkg.highlights.length > 0 && (
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {pkg.highlights.map((h) => (
                      <li key={h} className={`${listItem} text-ink/85`}>
                        <Star className="mt-1 h-4 w-4 shrink-0 fill-amber-400 text-amber-400" aria-hidden="true" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              {/* Included / not included side by side */}
              <section aria-labelledby="included-heading">
                <SectionTitle id="included-heading">What&apos;s included</SectionTitle>
                <div className={`grid gap-8 ${pkg.exclusions.length > 0 ? "sm:grid-cols-2" : ""}`}>
                  <ul className="space-y-2.5">
                    {pkg.inclusions.map((item) => (
                      <li key={item} className={`${listItem} text-ink/85`}>
                        <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {pkg.exclusions.length > 0 && (
                    <div>
                      <h3 className="mb-2.5 text-sm font-semibold text-muted">Not included</h3>
                      <ul className="space-y-2.5">
                        {pkg.exclusions.map((item) => (
                          <li key={item} className={`${listItem} text-muted`}>
                            <X className="mt-1 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>

              {/* Itinerary */}
              {pkg.itinerary && pkg.itinerary.length > 0 && (
                <section aria-labelledby="itinerary-heading">
                  <SectionTitle id="itinerary-heading">Itinerary</SectionTitle>
                  <ol role="list">
                    {pkg.itinerary.map((step, index) => (
                      <li key={index} className="relative flex gap-4 pb-6 last:pb-0">
                        {/* Line linking this step to the next one (none after the last) */}
                        {index < pkg.itinerary.length - 1 && (
                          <span className="absolute bottom-0 left-[15px] top-9 w-0.5 bg-amber-500/25" aria-hidden="true" />
                        )}
                        <span
                          className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-dune-950"
                          aria-hidden="true"
                        >
                          {index + 1}
                        </span>
                        <div className="min-w-0 pt-1">
                          <h3 className="font-heading text-[0.9375rem] font-semibold leading-snug text-ink">{step.title}</h3>
                          {step.time && (
                            <p className="mt-0.5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-accent">
                              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                              {step.time}
                            </p>
                          )}
                          {step.description && (
                            <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{step.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* Good to know: pickup, notes, cancellation */}
              {(pkg.pickup_info || (pkg.know_before_you_go && pkg.know_before_you_go.length > 0) || pkg.cancellation_policy) && (
                <section aria-labelledby="info-heading">
                  <SectionTitle id="info-heading">Good to know</SectionTitle>
                  <ul className="space-y-3">
                    {pkg.pickup_info && (
                      <li className={`${listItem} text-ink/85`}>
                        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
                        <span>
                          <span className="font-semibold text-ink">Pickup: </span>
                          {pkg.pickup_info}
                        </span>
                      </li>
                    )}
                    {(pkg.know_before_you_go || []).map((note) => (
                      <li key={note} className={`${listItem} text-ink/85`}>
                        <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
                        <span>{note}</span>
                      </li>
                    ))}
                    {pkg.cancellation_policy && (
                      <li className={`${listItem} text-ink/85`}>
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
                        <span>
                          <span className="font-semibold text-ink">Cancellation: </span>
                          {pkg.cancellation_policy}
                        </span>
                      </li>
                    )}
                  </ul>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="link-arrow mt-5 min-h-11">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Question about this tour? Ask us on WhatsApp</span>
                  </a>
                </section>
              )}

            </div>
          </div>

          {/* ── Booking panel ────────────────────────────────────────── */}
          <aside aria-label="Book this tour" className="min-w-0">
            <div className="lg:sticky lg:top-24">
              <FlexiblePriceCalculator pkg={pkg} />
            </div>
          </aside>
        </div>
      </div>

      {/* ── Related packages ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="bg-surface-alt py-14 sm:py-16">
          <div className="container-page">
            <div className="mb-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="kicker">Keep exploring</p>
                <h2 id="related-heading" className="mt-2 font-display text-[clamp(1.5rem,1.35rem+0.6vw,1.875rem)] font-bold text-ink">
                  You may also like
                </h2>
              </div>
              <Link href="/packages" className="link-arrow min-h-11 shrink-0">
                <span>View all packages</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {related.map((p) => (
                <PackageCard key={p.id} pkg={toPackageCardData(p)} />
              ))}
            </div>
          </div>
        </section>
      )}

      <StickyBookingBar pkg={pkg} />
    </div>
  );
}
