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
import { toPackageCardData } from "@/components/packages/PackageCard";

import {
  getPackages,
  getActivities,
  getGalleryItems,
  getFAQs,
  getApprovedReviews,
} from "@/lib/data/store";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  // Hero poster is the first large paint; fetch it with the HTML instead of after hydration
  preload("/images/hero-poster.webp", { as: "image", fetchPriority: "high" });

  const [packages, activities, galleryItems, faqs, reviews] = await Promise.all([
    getPackages(),
    getActivities(),
    getGalleryItems(),
    getFAQs(),
    getApprovedReviews(),
  ]);

  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero Section with Trust Badges & Action CTAs */}
      <HeroSection />

      {/* 2. Featured Safari Packages */}
      <FeaturedPackages packages={packages.map(toPackageCardData)} />

      {/* Subtle Luxury Gold Section Transition */}
      <div className="w-full flex justify-center py-2 bg-[#FBF7F0] dark:bg-[#17120D]">
        <div className="section-divider-gold" />
      </div>

      {/* 3. Why Choose Safari Dune Tours */}
      <WhyChooseUs />

      {/* 4. Safari Activities */}
      <ActivitiesShowcase activities={activities} />

      {/* Subtle Luxury Gold Section Transition */}
      <div className="w-full flex justify-center py-2 bg-[#FBF7F0] dark:bg-[#17120D]">
        <div className="section-divider-gold" />
      </div>

      {/* 5. How It Works (4-Step Booking Process) */}
      <HowItWorks />

      {/* 6. Visual Desert Experience & Heritage */}
      <DesertExperience />

      {/* 7. Gallery Highlights */}
      <HomeGallery items={galleryItems} />

      {/* 9. Guest Testimonials & Reviews */}
      <HomeReviews reviews={reviews} />

      {/* 10. Frequently Asked Questions */}
      <HomeFAQ faqs={faqs} />

      {/* 11. High-converting Booking & WhatsApp CTA Banner */}
      <CTASection />
    </div>
  );
}
