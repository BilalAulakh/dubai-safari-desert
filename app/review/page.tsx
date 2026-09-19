import { Metadata } from "next";
import { Suspense } from "react";
import DirectReviewForm from "./DirectReviewForm";
import { SITE_CONFIG } from "@/lib/config/site";
import { getPackages } from "@/lib/data/store";

export const metadata: Metadata = {
  title: "Share Your Desert Safari Review | Safari Dune Tours Dubai",
  description:
    "We value your feedback! Rate your Dubai desert safari experience and help future travelers discover the magic of our Arabian dunes.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/review`,
  },
  openGraph: {
    title: "Share Your Desert Safari Review | Safari Dune Tours Dubai",
    description:
      "Rate your Dubai desert safari experience. Share your feedback on our dune bashing, BBQ dinner, and camp hospitality.",
    url: `${SITE_CONFIG.url}/review`,
    siteName: SITE_CONFIG.name,
  },
};

export default async function DirectReviewPage() {
  const packages = await getPackages();
  const packageNames = packages.map((p) => p.name);

  return (
    <div className="min-h-screen bg-[#FBF7F0] dark:bg-[#120D09] text-[#17120D] dark:text-[#FBF7F0] pt-20 pb-12 sm:pt-24 sm:pb-14 transition-colors duration-200 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4 sm:px-5">
        <Suspense fallback={<div className="text-center py-10 text-slate-500 text-xs">Loading review form...</div>}>
          <DirectReviewForm tourOptions={packageNames} />
        </Suspense>
      </div>
    </div>
  );
}
