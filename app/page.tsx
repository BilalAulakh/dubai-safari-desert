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

export default async function HomePage() {
  const [packages, activities, galleryItems, reviews, faqs] = await Promise.all([
    getPackages(),
    getActivities(),
    getGalleryItems(),
    getApprovedReviews(),
    getFAQs(),
  ]);

  return (
    <div>
      {/* 1. Hero Section with Trust Badges & Action CTAs */}
      <HeroSection />

      {/* 2. Featured Safari Packages */}
      <FeaturedPackages packages={packages} />

      {/* 3. Why Choose DubaiSafariDesert */}
      <WhyChooseUs />

      {/* 4. Safari Activities */}
      <ActivitiesShowcase activities={activities} />

      {/* 5. How It Works */}
      <HowItWorks />

      {/* 6. Visual Desert Experience */}
      <DesertExperience />

      {/* 7. Featured Reviews (clearly identified demo testimonials) */}
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
