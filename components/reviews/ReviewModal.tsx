"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, X, Send, Loader2, CheckCircle2, ShieldAlert } from "lucide-react";
import { reviewSchema, ReviewFormData } from "@/lib/validations/review";
import { useAppDispatch } from "@/lib/redux/hooks";
import { submitReview } from "@/lib/redux/slices/reviewsSlice";

export default function ReviewModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      website_honeypot: "",
    },
  });

  const currentRating = watch("rating") || 5;

  const onSubmit = async (data: ReviewFormData) => {
    setErrorMessage(null);
    try {
      const actionResult = await dispatch(submitReview(data));
      if (submitReview.fulfilled.match(actionResult)) {
        setSubmitted(true);
        reset();
        router.refresh();
      } else if (submitReview.rejected.match(actionResult)) {
        setErrorMessage(actionResult.payload || "Submission failed. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Submission failed. Please try again.");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSubmitted(false);
    setErrorMessage(null);
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-105 active:scale-95"
        id="open-review-modal-btn"
      >
        Write a Review
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative">
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close review dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Review Published!</h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you for your feedback! Your review is now live on our website.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Share Your Safari Experience</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    We value honest feedback from every traveler who explores the desert with us.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs border border-rose-200">
                    {errorMessage}
                  </div>
                )}

                {/* Rating selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Rating (1 to 5 Stars) *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setValue("rating", star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= currentRating
                              ? "text-amber-500 fill-amber-500"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">
                      {currentRating} out of 5
                    </span>
                  </div>
                </div>

                {/* Name & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      {...register("customer_name")}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    {errors.customer_name && (
                      <p className="mt-1 text-xs text-rose-500">{errors.customer_name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Country of Residence *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. United Kingdom"
                      {...register("country")}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    {errors.country && (
                      <p className="mt-1 text-xs text-rose-500">{errors.country.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. john@example.com (will not be published)"
                    {...register("email")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Review *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell other travelers about your dune bashing, camp food, guides, and highlights..."
                    {...register("comment")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                  {errors.comment && (
                    <p className="mt-1 text-xs text-rose-500">{errors.comment.message}</p>
                  )}
                </div>

                {/* Honeypot field (hidden from humans, filled by spam bots) */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website_honeypot")}
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit for Moderation</span>
                      </>
                    )}
                  </button>
                  <p className="mt-2 text-center text-[11px] text-slate-400">
                    To maintain authenticity, reviews undergo editorial moderation before publication.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
