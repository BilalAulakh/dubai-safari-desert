import Link from "next/link";
import { Star, MessageSquarePlus, ShieldAlert } from "lucide-react";
import { Review } from "@/types";
import { formatDate } from "@/lib/utils";

interface HomeReviewsProps {
  reviews: Review[];
}

export default function HomeReviews({ reviews }: HomeReviewsProps) {
  const displayReviews = reviews.slice(0, 3);

  return (
    <section className="py-20 bg-[#FCFBF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Guest Feedback & Experiences
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              What Travelers Say About Our Safaris
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Reviews shown with demo tags reflect sample traveler testimonials.</span>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-600" />
              <span>Leave a Review</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? "text-amber-500 fill-amber-500"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                  {rev.is_demo && (
                    <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 font-medium">
                      Demo Preview
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.customer_name}</h4>
                  <p className="text-xs text-slate-500">{rev.country}</p>
                </div>
                <span className="text-[11px] text-slate-400">
                  {formatDate(rev.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
