import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Package } from "@/types";
import PackageCard, { toPackageCardData } from "@/components/packages/PackageCard";
import ScrollReveal from "@/components/common/ScrollReveal";
import { HOMEPAGE_GROUP_SIZE, HOMEPAGE_PACKAGE_GROUPS, PACKAGE_FILTERS } from "@/lib/config/packageGroups";

interface FeaturedPackagesProps {
  packages: Package[];
}

// Homepage shows a short, grouped selection; the full catalogue lives on /packages
export default function FeaturedPackages({ packages }: FeaturedPackagesProps) {
  const bySlug = new Map(packages.filter((p) => p.active).map((p) => [p.slug, p]));

  // Flatten the configured groups into one ordered list (no group headings on the page)
  const homepagePackages: Package[] = [];
  const shown = new Set<string>(); // a package appears at most once

  for (const group of HOMEPAGE_PACKAGE_GROUPS) {
    const max = group.max ?? HOMEPAGE_GROUP_SIZE;
    const groupPackages = group.slugs
      .map((slug) => bySlug.get(slug))
      .filter((p): p is Package => Boolean(p) && !shown.has(p!.slug))
      .slice(0, max);
    for (const filterId of group.fill ?? []) {
      const filter = PACKAGE_FILTERS.find((f) => f.id === filterId);
      if (!filter) continue;
      for (const pkg of bySlug.values()) {
        if (groupPackages.length >= max) break;
        if (filter.matches(pkg) && !shown.has(pkg.slug) && !groupPackages.includes(pkg)) {
          groupPackages.push(pkg);
        }
      }
    }
    groupPackages.forEach((p) => shown.add(p.slug));
    homepagePackages.push(...groupPackages);
  }

  return (
    <section className="section-y overflow-hidden bg-surface-alt" id="packages">
      <div className="container-page">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
            <p className="kicker justify-center after:h-px after:w-8 after:bg-current after:opacity-70 after:content-['']">
              Curated Safari Experiences
            </p>
            <h2 className="mt-5 font-display text-h2 font-bold text-ink">
              Choose your evening in the <span className="italic text-accent">dunes</span>
            </h2>
            <p className="mt-5 text-body-lg text-muted">
              Red dune bashing, quad bikes and buggies, and nights under the stars at a Bedouin camp.
            </p>
          </div>
        </ScrollReveal>

        {/* One continuous grid, in group order: full-width on mobile, two columns on tablet, three on desktop */}
        {homepagePackages.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {homepagePackages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={toPackageCardData(pkg)} priority={i < 3} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center lg:mt-16">
          <Link href="/packages" className="btn-outline btn-lg group">
            <span>View all packages</span>
            <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
