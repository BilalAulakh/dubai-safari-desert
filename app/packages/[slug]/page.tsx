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
} from "lucide-react";
import { getPackageBySlug, getPackages } from "@/lib/data/store";
import { formatPrice, createWhatsAppUrl, optimizeImageUrl } from "@/lib/utils";
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

// Section heading used down the left column
function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="kicker">{kicker}</p>
      <h2 className="mt-2 font-heading text-2xl font-semibold text-ink">{title}</h2>
    </div>
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

  // Gallery photos other than the hero photo, as a short strip
  const photos = Array.from(new Set((pkg.gallery || []).filter((g) => g && g !== pkg.main_image))).slice(0, 3);
  const hasDiscount = Boolean(pkg.original_price && pkg.original_price > pkg.price);
  const unitLabel = pkg.per_unit || "per person";

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

  return (
    <div className="bg-page text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }} />

      {/* Hero: the package photo, clear, with shade only behind the copy */}
      <section className="relative isolate flex min-h-[46vh] items-end overflow-hidden bg-dune-950 pb-10 pt-32 sm:min-h-[52vh] sm:pb-12">
        <img
          src={optimizeImageUrl(pkg.main_image, 1600)}
          alt={pkg.name}
          width={1600}
          height={900}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-dune-950 via-dune-950/45 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-dune-950/70 via-dune-950/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-dune-950/60 to-transparent" />

        <div className="container-page w-full">
          <div className="max-w-3xl">
            <Breadcrumbs items={[{ label: "Safari Packages", href: "/packages" }, { label: pkg.name }]} className="mb-5" />

            <span className="inline-flex rounded-full border border-amber-300/40 bg-dune-950/50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-300 backdrop-blur-md">
              {pkg.badges?.[0] || "Signature Dubai Tour"}
            </span>

            <h1 className="mt-4 font-heading text-3xl font-semibold leading-tight text-sand-50 sm:text-4xl lg:text-[2.75rem] [text-shadow:0_2px_20px_rgb(10_15_36/0.6)]">
              {pkg.name}
            </h1>

            <div className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-300">
                  From
                  {hasDiscount && (
                    <span className="ml-2 font-normal normal-case tracking-normal text-sand-400 line-through">
                      AED {pkg.original_price}
                    </span>
                  )}
                </p>
                <p className="mt-1 font-heading text-3xl font-semibold leading-none text-sand-50">
                  AED {pkg.price}
                  <span className="ml-2 text-sm font-normal text-sand-400">{unitLabel}</span>
                </p>
              </div>
              <ul className="flex flex-wrap gap-2 text-xs font-medium text-sand-50 sm:text-sm">
                <li className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <Clock className="h-4 w-4 text-amber-300" aria-hidden="true" />
                  {pkg.duration}
                </li>
                <li className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <MapPin className="h-4 w-4 text-amber-300" aria-hidden="true" />
                  Hotel pickup
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page py-12 sm:py-16">
        {/* Photo mosaic: one large photo and up to four smaller ones */}
        {photos.length > 0 && (
          <div className={`mb-12 grid gap-3 ${photos.length === 1 ? "grid-cols-1" : photos.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
            {photos.map((src, i) => (
              <div key={src} className="relative h-36 overflow-hidden rounded-2xl bg-dune-900 sm:h-48">
                <img
                  src={optimizeImageUrl(src, 600)}
                  alt={`${pkg.name} photo ${i + 1}`}
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
          {/* Left column */}
          <div className="space-y-12">
            {/* Overview */}
            <section>
              <SectionHeading kicker="Overview" title="About this experience" />
              <p className="whitespace-pre-line text-body leading-relaxed text-muted">{pkg.description}</p>
            </section>

            {/* Included / not included */}
            <section>
              <SectionHeading kicker="What you get" title="Included in your safari" />
              <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {pkg.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm">
                {pkg.exclusions.length > 0 && (
                  <div className="flex items-start gap-2.5">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                    <div>
                      <dt className="inline font-semibold text-ink">Not included: </dt>
                      <dd className="inline text-muted">{pkg.exclusions.join(" · ")}</dd>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
                  <div>
                    <dt className="inline font-semibold text-ink">Pickup: </dt>
                    <dd className="inline text-muted">{pkg.pickup_info}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
                  <div>
                    <dt className="inline font-semibold text-ink">Cancellation: </dt>
                    <dd className="inline text-muted">{pkg.cancellation_policy}</dd>
                  </div>
                </div>
              </dl>
            </section>

            {/* Itinerary */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <section>
                <SectionHeading kicker="Your day" title="Itinerary" />
                <ol className="relative space-y-5 border-l border-amber-500/40 pl-8">
                  {pkg.itinerary.map((step, index) => (
                    <li key={index} className="relative">
                      <span
                        className="absolute -left-10.25 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-dune-900 text-[11px] font-semibold text-amber-300 ring-4 ring-page"
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <h3 className="text-sm font-semibold text-ink">
                        {step.title}
                        <span className="ml-2 text-xs font-medium text-accent">{step.time}</span>
                      </h3>
                      <p className="mt-0.5 text-sm text-muted">{step.description}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Have a question about this tour? Ask us on WhatsApp
            </a>
          </div>

          {/* Right column: booking calculator */}
          <aside>
            <div className="lg:sticky lg:top-28">
              <FlexiblePriceCalculator pkg={pkg} />
            </div>
          </aside>
        </div>
      </div>

      {/* You may also like */}
      {related.length > 0 && (
        <section className="bg-surface-alt py-14 sm:py-16">
          <div className="container-page">
            <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="kicker">Keep exploring</p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-ink">You may also like</h2>
              </div>
              <Link href="/packages" className="link-arrow shrink-0">
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
