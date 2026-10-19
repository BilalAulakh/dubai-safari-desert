import { Suspense } from "react";
import type { Metadata } from "next";
import { preload } from "react-dom";
import HeroSection, { HERO_IMAGE, HERO_IMAGE_MOBILE } from "@/components/home/HeroSection";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import HowItWorks from "@/components/home/HowItWorks";
import HomeReviews from "@/components/home/HomeReviews";
import HomeFAQ from "@/components/home/HomeFAQ";
import CTASection from "@/components/home/CTASection";
import { SectionSkeleton } from "@/components/common/Skeletons";

import {
  getPackages,
  getFAQs,
  getApprovedReviews,
} from "@/lib/data/store";
import { getStartingPrice } from "@/lib/data/pricing";
import { SITE_CONFIG } from "@/lib/config/site";
import { formatPrice } from "@/lib/utils";

export const revalidate = 86400; // 1 day; admin saves refresh pages on demand

export async function generateMetadata(): Promise<Metadata> {
  const startingPrice = await getStartingPrice();
  const fromPrice = startingPrice !== null ? ` from ${formatPrice(startingPrice)}` : "";
  const description = `Book a Dubai desert safari${fromPrice} with hotel pickup, 4x4 dune bashing, camel rides, BBQ dinner and live shows. Pay on the day with ${SITE_CONFIG.name}.`;
  return {
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      title: SITE_CONFIG.title,
      description,
      images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630, alt: "Dubai Desert Safari Adventures" }],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.title,
      description,
      images: [SITE_CONFIG.ogImage],
    },
  };
}

// Each data-backed section fetches its own data, so static sections render
// immediately and the rest stream in behind their own skeleton.
async function PackagesBlock() {
  return <FeaturedPackages packages={await getPackages()} />;
}

async function ReviewsBlock() {
  return <HomeReviews reviews={await getApprovedReviews()} />;
}

async function FAQBlock() {
  return <HomeFAQ faqs={await getFAQs()} />;
}

export default async function HomePage() {
  const startingPrice = await getStartingPrice();

  // Hero poster is the first large paint; fetch it with the HTML instead of after hydration
  preload(HERO_IMAGE_MOBILE, { as: "image", fetchPriority: "high", media: "(max-width: 767px)" });
  preload(HERO_IMAGE, { as: "image", fetchPriority: "high", media: "(min-width: 768px)" });

  return (
    <div className="overflow-x-hidden">
      {/* Kept to what helps a visitor decide and book: offer, packages, process, proof, answers */}
      <HeroSection startingPrice={startingPrice} />

      <Suspense fallback={<SectionSkeleton />}>
        <PackagesBlock />
      </Suspense>

      <HowItWorks />

      <Suspense fallback={<SectionSkeleton />}>
        <ReviewsBlock />
      </Suspense>

      <Suspense fallback={<SectionSkeleton cards={0} />}>
        <FAQBlock />
      </Suspense>

      <CTASection />
    </div>
  );
}
