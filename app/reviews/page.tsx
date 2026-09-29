import { Metadata } from "next";
import Link from "next/link";
import { Star, MessageSquarePlus, ShieldCheck, ShieldAlert } from "lucide-react";
import { getApprovedReviews } from "@/lib/data/store";
import { formatDate } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config/site";
import ReviewModal from "@/components/reviews/ReviewModal";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Guest Reviews & Experiences | Safari Dune Tours",
  description:
    "Read feedback from guests who experienced our Dubai desert safaris. Guest comments on dune bashing, camel rides, and camp hospitality.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/reviews`,
  },
  openGraph: {
    title: "Guest Reviews & Experiences | Safari Dune Tours",
    description:
      "Read feedback from guests who experienced our Dubai desert safaris. Guest comments on dune bashing, camel rides, and camp hospitality.",
    url: `${SITE_CONFIG.url}/reviews`,
    siteName: SITE_CONFIG.name,
  },
};

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();

  return (
    <div className="bg-[#FBF7F0] dark:bg-[#17120D] text-[#17120D] dark:text-[#FBF7F0] transition-colors duration-200">
      {/* Banner */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 bg-[#17120D] text-white border-b border-[#C89B3C]/20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C89B3C] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-[#C89B3C] text-[#C89B3C]" />
            <span>Traveler Experiences</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
            Safari Dune <span className="gold-text-gradient">Guest Reviews</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#B8ADA2] max-w-2xl mx-auto leading-relaxed">
            Read what our travelers have to say about our desert safaris, licensed drivers, and authentic Arabian hospitality.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/review"
              className="btn-gold px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg inline-flex items-center gap-2"
            >
              <Star className="w-4 h-4 fill-[#17120D]" />
              <span>Write a Review</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Authenticity Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="p-4 rounded-xl bg-[#C89B3C]/10 border border-[#C89B3C]/25 text-xs text-[#8C6214] dark:text-[#E8C48A] flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-[#C89B3C] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">100% Genuine Guest Feedback:</span> Every review displayed is directly submitted by verified travelers who joined our desert safaris.
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#241A12] border border-[#C89B3C]/20 shadow-sm flex flex-col justify-between hover:border-[#C89B3C]/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating
                              ? "text-[#C89B3C] fill-[#C89B3C]"
                              : "text-slate-200 dark:text-white/15"
                          }`}
                        />
                      ))}
                    </div>

                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                      Verified Guest
                    </span>
                  </div>

                  <p className="text-sm text-[#17120D]/85 dark:text-[#FBF7F0]/85 leading-relaxed italic mb-6">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C89B3C]/15 dark:border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-heading font-bold text-[#17120D] dark:text-[#FBF7F0]">{rev.customer_name}</h4>
                    <p className="text-[#6B6258] dark:text-[#B8ADA2]">{rev.country}</p>
                  </div>
                  <span className="text-[#6B6258] dark:text-[#B8ADA2]">{formatDate(rev.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-[#241A12] border border-[#C89B3C]/20 max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="flex justify-center text-[#C89B3C] gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-7 h-7 fill-[#C89B3C]" />
              ))}
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#17120D] dark:text-[#FBF7F0]">
              Be The First Guest Reviewer!
            </h3>
            <p className="text-sm text-[#6B6258] dark:text-[#B8ADA2] max-w-md mx-auto">
              Share your genuine feedback on our Dubai desert safari experience and help future travelers plan their trip.
            </p>
            <Link
              href="/review"
              className="btn-gold inline-flex items-center gap-2 px-7 py-3 text-xs uppercase font-bold tracking-wider"
            >
              <span>Write Your Review Now</span>
            </Link>
          </div>
        )}
      </section>

      <CTASection />
    </div>
  );
}
