import { Suspense } from "react";
import type { Metadata } from "next";
import { preload } from "react-dom";
import HeroSection from "@/components/home/HeroSection";
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

export const revalidate = 86400; // 1 day; admin saves refresh pages on demand

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

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

export default function HomePage() {
  // Hero poster is the first large paint; fetch it with the HTML instead of after hydration
  preload("/images/hero-poster.webp", { as: "image", fetchPriority: "high" });

  return (
    <div className="overflow-x-hidden">
      {/* Kept to what helps a visitor decide and book: offer, packages, process, proof, answers */}
      <HeroSection />

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
