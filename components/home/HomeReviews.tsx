import Link from "next/link";
import { Star, MessageSquarePlus, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { Review } from "@/types";
import { formatDate } from "@/lib/utils";
import { initialReviews } from "@/lib/data/reviews";

interface HomeReviewsProps {
  reviews: Review[];
}

export default function HomeReviews({ reviews }: HomeReviewsProps) {
  const displayReviews = (reviews || []).slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-[#FBF7F0] dark:bg-[#17120D] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#C89B3C] dark:text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
              <span>Guest Experiences</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#17120D] dark:text-[#FBF7F0] tracking-tight leading-[1.15]">
              What Travelers Say About Our Safaris
            </h2>
            <div className="mt-2.5 flex items-center gap-2 text-xs text-[#6B6258] dark:text-[#B8ADA2]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Verified 5-star traveler testimonials & authentic guest feedback</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/review"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-[#241A12] border border-[#C89B3C]/30 text-[#17120D] dark:text-[#FBF7F0] hover:border-[#C89B3C] hover:bg-[#C89B3C]/10 text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#C89B3C]" />
              <span>Leave a Review</span>
            </Link>
          </div>
        </div>

        {displayReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {displayReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#241A12] border border-[#C89B3C]/20 shadow-sm hover:border-[#C89B3C]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center justify-between gap-1 mb-5">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating
                              ? "text-[#C89B3C] fill-[#C89B3C]"
                              : "text-slate-200 dark:text-white/10"
                          }`}
                        />
                      ))}
                    </div>

                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                      Verified Guest
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#17120D]/85 dark:text-[#FBF7F0]/85 italic leading-relaxed mb-6 font-serif">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C89B3C]/15 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-heading text-base font-bold text-[#17120D] dark:text-[#FBF7F0]">
                      {rev.customer_name}
                    </h4>
                    <p className="text-xs text-[#6B6258] dark:text-[#B8ADA2]">{rev.country}</p>
                  </div>
                  <span className="text-[11px] text-[#6B6258] dark:text-[#B8ADA2]">
                    {formatDate(rev.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-6 rounded-3xl bg-white dark:bg-[#241A12] border border-[#C89B3C]/20 max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="flex justify-center text-amber-500 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-500" />
              ))}
            </div>
            <h3 className="text-xl font-bold text-[#17120D] dark:text-[#FBF7F0]">
              Be Our Next Featured Reviewer!
            </h3>
            <p className="text-sm text-[#6B6258] dark:text-[#B8ADA2]">
              Have you experienced our Dubai Desert Safari? We would love to hear your authentic feedback.
            </p>
            <Link
              href="/review"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 text-xs uppercase font-extrabold tracking-wider"
            >
              <span>Write Your 5-Star Review</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {displayReviews.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C89B3C] hover:text-[#E8C48A] uppercase tracking-wider transition-colors group"
            >
              <span>Read All Verified Guest Reviews</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
