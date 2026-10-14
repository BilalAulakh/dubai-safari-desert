import Link from "next/link";
import { Star, MessageSquarePlus, CheckCircle2, ArrowRight } from "lucide-react";
import { Review } from "@/types";
import { formatDate } from "@/lib/utils";

interface HomeReviewsProps {
  reviews: Review[];
}

export default function HomeReviews({ reviews }: HomeReviewsProps) {
  const displayReviews = (reviews || []).slice(0, 3);

  return (
    <section className="section bg-[#FBF7F0] dark:bg-[#17120D] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <div className="eyebrow">
              <span>Guest Experiences</span>
            </div>
            <h2 className="section-title">
              Authentic Guest Experiences
            </h2>
            <div className="mt-3 flex items-center gap-2 text-sm text-[#5E554C] dark:text-[#B8ADA2]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Genuine traveler feedback directly from our desert safari guests</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/review"
              className="btn-outline"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#8C6214] dark:text-[#E8C48A]" />
              <span>Leave a Review</span>
            </Link>
          </div>
        </div>

        {displayReviews.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6">
            {displayReviews.map((rev) => (
              <div
                key={rev.id}
                className="card card-hover w-full md:w-[calc(33.333%-1rem)] p-6 sm:p-7 flex flex-col justify-between"
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
                              ? "text-[#D69E2E] fill-[#D69E2E]"
                              : "text-slate-200 dark:text-white/10"
                          }`}
                        />
                      ))}
                    </div>

                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                      Verified Guest
                    </span>
                  </div>

                  <p className="text-[15px] text-[#17120D]/85 dark:text-[#FBF7F0]/85 leading-relaxed mb-6">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <div>
                    <h4 className="font-heading text-base font-bold text-[#17120D] dark:text-[#FBF7F0]">
                      {rev.customer_name}
                    </h4>
                    <p className="text-xs text-[#5E554C] dark:text-[#B8ADA2]">{rev.country}</p>
                  </div>
                  <span className="text-xs text-[#5E554C] dark:text-[#B8ADA2]">
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
            <p className="text-sm text-[#5E554C] dark:text-[#B8ADA2]">
              Have you experienced our Dubai Desert Safari? We would love to hear your authentic feedback.
            </p>
            <Link
              href="/review"
              className="btn-gold"
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
              className="link-arrow"
            >
              <span>Read All Verified Guest Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
