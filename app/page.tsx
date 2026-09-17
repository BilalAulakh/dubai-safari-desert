import HeroSection from "@/components/home/HeroSection";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ActivitiesShowcase from "@/components/home/ActivitiesShowcase";
import HowItWorks from "@/components/home/HowItWorks";
import DesertExperience from "@/components/home/DesertExperience";
import HomeReviews from "@/components/home/HomeReviews";
import HomeGallery from "@/components/home/HomeGallery";
import HomeFAQ from "@/components/home/HomeFAQ";
import CTASection from "@/components/home/CTASection";

import {
  getPackages,
  getActivities,
  getGalleryItems,
  getApprovedReviews,
  getFAQs,
} from "@/lib/data/store";

export const revalidate = 3600;

import WhyTravelersChooseUs from "@/components/home/WhyTravelersChooseUs";

export default async function HomePage() {
  const [packages, activities, reviews, galleryItems, faqs] = await Promise.all([
    getPackages(),
    getActivities(),
    getApprovedReviews(),
    getGalleryItems(),
    getFAQs(),
  ]);

  return (
    <div>
      {/* 1. Hero Section with Trust Badges & Action CTAs */}
      <HeroSection />

      {/* 2. Featured Safari Packages */}
      <FeaturedPackages packages={packages} />

      {/* 3. Why Choose Safari Dune Tours */}
      <WhyChooseUs />

      {/* 4. Safari Activities */}
      <ActivitiesShowcase activities={activities} />

      {/* 5. How It Works (4-Step Booking Process) */}
      <HowItWorks />

      {/* 6. Visual Desert Experience */}
      <DesertExperience />

      {/* 7. Social Proof: Why Travelers Choose Us */}
      <WhyTravelersChooseUs />

      {/* 8. Featured Reviews */}
      <HomeReviews reviews={reviews} />

      {/* 8. Gallery Highlights */}
      <HomeGallery items={galleryItems} />

      {/* 9. Frequently Asked Questions */}
      <HomeFAQ faqs={faqs} />

      {/* 10. High-converting Booking & WhatsApp CTA Banner */}
      <CTASection />
    </div>
  );
}
