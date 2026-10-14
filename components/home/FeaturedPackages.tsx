import Link from "next/link";
import { ArrowRight, MessageCircle, Users } from "lucide-react";
import type { Package } from "@/types";
import PackageCard, { toPackageCardData } from "@/components/packages/PackageCard";
import ScrollReveal from "@/components/common/ScrollReveal";
import { HOMEPAGE_PACKAGE_GROUPS, PACKAGE_FILTERS } from "@/lib/config/packageGroups";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

interface FeaturedPackagesProps {
  packages: Package[];
}

// Homepage shows a short, grouped selection; the full catalogue lives on /packages
export default function FeaturedPackages({ packages }: FeaturedPackagesProps) {
  const bySlug = new Map(packages.filter((p) => p.active).map((p) => [p.slug, p]));
  let cardIndex = 0;
  const groupWhatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    "Hello Safari Dune Tours, we are a group of 4 or more. Could you share your group rates?"
  );

  return (
    <section className="section-y overflow-hidden bg-page">
      <div className="container-page">
        <ScrollReveal>
          <div className="mb-12 max-w-2xl lg:mb-16">
            <p className="kicker">Curated Safari Experiences</p>
            <h2 className="mt-5 font-display text-h2 font-semibold text-ink">
              Signature Dubai Desert Safaris & Tours
            </h2>
            <p className="mt-5 text-body-lg text-muted">
              Explore our hand-picked collection of red dune bashes, quad bike adventures, and authentic Bedouin camps.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-14 lg:space-y-20">
          {HOMEPAGE_PACKAGE_GROUPS.map((group) => {
            if ("filter" in group) {
              const filter = PACKAGE_FILTERS.find((f) => f.id === group.filter);
              const matching = filter ? packages.filter((p) => p.active && filter.matches(p)) : [];
              if (matching.length === 0) return null;
              const fromPrice = Math.min(...matching.map((p) => p.price));
              const cover = [...matching].sort((a, b) => a.price - b.price)[0];

              return (
                <div key={group.title}>
                  <h3 className="mb-6 text-label font-semibold uppercase text-accent">{group.title}</h3>
                  <CategoryCard
                    href={`/packages?category=${group.filter}`}
                    title={group.cardTitle}
                    summary={`${matching.length} quad bike & buggy experiences from AED ${fromPrice}`}
                    image={cover.main_image}
                  />
                </div>
              );
            }

            const groupPackages = group.slugs
              .map((slug) => bySlug.get(slug))
              .filter((p): p is Package => Boolean(p));
            if (groupPackages.length === 0) return null;

            return (
              <div key={group.title}>
                <h3 className="mb-6 text-label font-semibold uppercase text-accent">{group.title}</h3>
                {/* Snap carousel on mobile/tablet, bleeding to the screen edge; plain grid on desktop */}
                <div className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-6 pt-1 no-scrollbar sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:p-0">
                  {groupPackages.map((pkg) => (
                    <div key={pkg.id} className="w-[85%] max-w-[24rem] shrink-0 snap-start sm:w-[46%] lg:w-auto lg:max-w-none">
                      <PackageCard pkg={toPackageCardData(pkg)} priority={cardIndex++ < 3} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Group pricing lives here once, instead of repeating on every card */}
        <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl bg-surface-alt p-6 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:mt-20">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-accent">
              <Users className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-body-lg text-ink">
              Travelling as a group of 4 or more? WhatsApp us for special rates.
            </p>
          </div>
          <a href={groupWhatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp shrink-0">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  href,
  title,
  summary,
  image,
}: {
  href: string;
  title: string;
  summary: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[18rem] items-end overflow-hidden rounded-2xl bg-dune-900 ring-1 ring-line transition-shadow duration-500 hover:shadow-glow-amber sm:min-h-[20rem]"
    >
      <img
        src={image}
        alt=""
        width={1200}
        height={600}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] motion-safe:group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dune-950/90 via-dune-950/40 to-transparent" />
      <div className="relative flex w-full flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <p className="font-display text-h3 font-semibold text-sand-50">{title}</p>
          <p className="mt-2 text-body text-sand-100">{summary}</p>
        </div>
        <span className="btn-gold shrink-0 self-start sm:self-auto">
          <span>View all</span>
          <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
