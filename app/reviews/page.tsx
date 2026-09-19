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
    <div className="bg-[#FCFBF8] dark:bg-[#080B11] text-slate-900 dark:text-white transition-colors duration-200">
      {/* Banner */}
      <section className="relative py-20 bg-[#F4EFE6] dark:bg-[#0B0F17] text-slate-900 dark:text-white border-b border-amber-900/10 dark:border-amber-500/20 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600 dark:text-amber-400" />
            <span>Traveler Experiences</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto">
            Safari Dune Reviews
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Read what our travelers have to say about our desert safaris, licensed drivers, and Arabian hospitality.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/review"
              className="btn-gold px-7 py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg inline-flex items-center gap-2"
            >
              <Star className="w-4 h-4 fill-slate-950" />
              <span>Write a Review</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Authenticity Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/70 dark:border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
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
                className="p-6 rounded-2xl bg-white dark:bg-[#1D150E] border border-slate-200 dark:border-[#C89B3C]/20 shadow-sm flex flex-col justify-between hover:border-[#C89B3C]/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating
                              ? "text-amber-500 fill-amber-500"
                              : "text-slate-200 dark:text-white/15"
                          }`}
                        />
                      ))}
                    </div>

                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                      Verified Guest
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{rev.customer_name}</h4>
                    <p className="text-slate-500 dark:text-slate-400">{rev.country}</p>
                  </div>
                  <span className="text-slate-400">{formatDate(rev.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-[#1D150E] border border-[#C89B3C]/20 max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="flex justify-center text-amber-500 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-7 h-7 fill-amber-500" />
              ))}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Be The First Guest Reviewer!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Share your genuine feedback on our Dubai desert safari experience and help future travelers plan their trip.
            </p>
            <Link
              href="/review"
              className="btn-gold inline-flex items-center gap-2 px-7 py-3 text-xs uppercase font-extrabold tracking-wider"
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
