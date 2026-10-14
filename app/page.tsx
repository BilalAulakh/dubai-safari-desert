import { Suspense } from "react";
import type { Metadata } from "next";
import { preload } from "react-dom";
import HeroSection from "@/components/home/HeroSection";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ActivitiesShowcase from "@/components/home/ActivitiesShowcase";
import HowItWorks from "@/components/home/HowItWorks";
import DesertExperience from "@/components/home/DesertExperience";
import HomeGallery from "@/components/home/HomeGallery";
import HomeReviews from "@/components/home/HomeReviews";
import HomeFAQ from "@/components/home/HomeFAQ";
import CTASection from "@/components/home/CTASection";
import { SectionSkeleton } from "@/components/common/Skeletons";
import { toPackageCardData } from "@/components/packages/PackageCard";

import {
  getPackages,
  getActivities,
  getGalleryItems,
  getGalleryCategories,
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
  const packages = await getPackages();
  return <FeaturedPackages packages={packages.map(toPackageCardData)} />;
}

async function ActivitiesBlock() {
  return <ActivitiesShowcase activities={await getActivities()} />;
}

async function GalleryBlock() {
  const [items, categories] = await Promise.all([getGalleryItems(), getGalleryCategories()]);
  return <HomeGallery items={items} categories={categories} />;
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
      {/* 1. Hero Section with Action CTAs */}
      <HeroSection />

      {/* 2. Featured Safari Packages */}
      <Suspense fallback={<SectionSkeleton />}>
        <PackagesBlock />
      </Suspense>

      {/* 3. Why Choose Safari Dune Tours */}
      <WhyChooseUs />

      {/* 4. Safari Activities */}
      <Suspense fallback={<SectionSkeleton />}>
        <ActivitiesBlock />
      </Suspense>

      {/* 5. How It Works (4-Step Booking Process) */}
      <HowItWorks />

      {/* 6. Visual Desert Experience & Heritage */}
      <DesertExperience />

      {/* 7. Gallery Highlights */}
      <Suspense fallback={<SectionSkeleton cards={6} />}>
        <GalleryBlock />
      </Suspense>

      {/* 8. Guest Testimonials & Reviews */}
      <Suspense fallback={<SectionSkeleton />}>
        <ReviewsBlock />
      </Suspense>

      {/* 9. Frequently Asked Questions */}
      <Suspense fallback={<SectionSkeleton cards={0} />}>
        <FAQBlock />
      </Suspense>

      {/* 10. High-converting Booking & WhatsApp CTA Banner */}
      <CTASection />
    </div>
  );
}
