import { Metadata } from "next";
import { Star, MessageSquarePlus, ShieldCheck, ShieldAlert } from "lucide-react";
import { getApprovedReviews } from "@/lib/data/store";
import { formatDate } from "@/lib/utils";
import ReviewModal from "@/components/reviews/ReviewModal";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Guest Reviews & Experiences | DubaiSafariDesert",
  description:
    "Read genuine reviews and testimonials from guests who experienced our Dubai desert safaris. Verified guest feedback on dune bashing, camel rides, and camps.",
  alternates: {
    canonical: "/reviews",
  },
};

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();

  return (
    <div className="bg-[#FCFBF8]">
      {/* Banner */}
      <section className="relative py-20 bg-[#0B0F17] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Traveler Experiences</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Dubai Safari Desert Reviews
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Read what our travelers have to say about our desert safaris, licensed drivers, and Arabian hospitality.
          </p>

          <div className="mt-8 flex justify-center">
            <ReviewModal />
          </div>
        </div>
      </section>

      {/* Moderation Policy Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Authenticity & Moderation Notice:</span> Reviews marked with a &ldquo;Demo Preview&rdquo; badge are sample testimonials for website demonstration. Real submitted guest reviews are held in pending status until reviewed by our administration team to ensure spam-free, authentic community feedback.
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
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
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>

                  {rev.is_demo && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                      Demo Preview
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{rev.customer_name}</h4>
                  <p className="text-slate-500">{rev.country}</p>
                </div>
                <span className="text-slate-400">{formatDate(rev.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
