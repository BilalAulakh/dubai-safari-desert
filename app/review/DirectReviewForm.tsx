"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Star,
  Send,
  Loader2,
  CheckCircle2,
  Heart,
  MessageCircle,
  Compass,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

interface DirectReviewFormProps {
  tourOptions: string[];
}

export default function DirectReviewForm({ tourOptions }: DirectReviewFormProps) {
  const searchParams = useSearchParams();
  const initialName = searchParams.get("name") || "";
  const initialTour = searchParams.get("tour") || "";

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState(initialName);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTour, setSelectedTour] = useState(initialTour);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialName && !customerName) setCustomerName(initialName);
    if (initialTour && !selectedTour) setSelectedTour(initialTour);
  }, [initialName, initialTour]);

  const activeRating = hoverRating !== null ? hoverRating : rating;

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 5:
        return "Outstanding Experience! Loved it!";
      case 4:
        return "Great Safari Adventure!";
      case 3:
        return "Good Experience";
      case 2:
        return "Fair / Needs Improvement";
      case 1:
        return "Poor Experience";
      default:
        return "Tap to Rate";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!country.trim()) {
      setErrorMessage("Please select or enter your country/nationality.");
      return;
    }

    if (!comment.trim() || comment.trim().length < 10) {
      setErrorMessage("Please share at least a short sentence (10+ characters) about your experience.");
      return;
    }

    setSubmitting(true);

    try {
      // Include tour name in the review comment if specified
      const finalComment = selectedTour.trim()
        ? `[Tour: ${selectedTour.trim()}] ${comment.trim()}`
        : comment.trim();

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName.trim(),
          country: country.trim(),
          email: email.trim() || undefined,
          rating,
          comment: finalComment,
          website_honeypot: "",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || data.error || "Submission failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Error submitting review:", err);
      setErrorMessage("Network error. Please try again or submit via WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  // WhatsApp thank you / feedback share
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    `Hello Safari Dune! I just submitted my 5-star review for *${selectedTour || "Dubai Desert Safari"}*. Thank you for the wonderful experience!`
  );

  if (submitted) {
    return (
      <div className="bg-white dark:bg-[#1D150E] rounded-2xl p-6 sm:p-8 border border-[#C89B3C]/30 shadow-xl text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-md shadow-amber-500/25">
          <Heart className="w-7 h-7 fill-slate-950" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3 h-3" />
            <span>Review Published Successfully</span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Thank You, {customerName}!
          </h2>
          <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
            Your review and feedback mean the world to our team and help future travelers discover Dubai!
          </p>
        </div>

        {/* Rating Card Preview */}
        <div className="p-3.5 rounded-xl bg-[#FBF7F0] dark:bg-[#120D09] border border-[#C89B3C]/20 max-w-sm mx-auto text-left space-y-1.5">
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-500" />
            ))}
          </div>
          {selectedTour && (
            <span className="text-[10px] font-bold uppercase text-[#C89B3C] block">
              {selectedTour}
            </span>
          )}
          <p className="text-xs text-slate-700 dark:text-slate-300 italic">
            &ldquo;{comment}&rdquo;
          </p>
          <div className="pt-1.5 text-[11px] font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>{customerName}</span>
            <span className="text-slate-500 font-normal">{country}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
          <Link
            href="/reviews"
            className="btn-gold w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-1.5"
          >
            <span>View All Reviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
            <span>Notify on WhatsApp</span>
          </a>

          <Link
            href="/"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1D150E] rounded-2xl p-4 sm:p-5 border border-[#C89B3C]/25 shadow-xl space-y-3.5">
      {/* Header Banner */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-400 text-[9px] font-bold uppercase tracking-wider">
          <span>Guest Feedback</span>
        </div>

        <h1 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
          Rate Your Desert Safari
        </h1>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-tight">
          Please take 30 seconds to share your authentic experience.
        </p>
      </div>

      {errorMessage && (
        <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-[11px]">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Star Rating Selector */}
        <div className="bg-[#FBF7F0] dark:bg-[#120D09] py-2 px-3 rounded-xl border border-[#C89B3C]/20 text-center space-y-1">
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Overall Rating *
          </span>

          <div className="flex items-center justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
                className="p-0.5 transition-transform hover:scale-115 focus:outline-none"
                aria-label={`Rate ${star} stars`}
              >
                <Star
                  className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 ${
                    star <= activeRating
                      ? "text-amber-500 fill-amber-500 drop-shadow-[0_1px_4px_rgba(245,158,11,0.3)]"
                      : "text-slate-300 dark:text-slate-700"
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="text-[11px] font-medium text-amber-700 dark:text-amber-400 transition-all">
            {getRatingLabel(activeRating)}
          </p>
        </div>

        {/* Guest Name & Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Henderson"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/70 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Country / Nationality *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. United Kingdom, UAE"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/70 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all"
            />
          </div>
        </div>

        {/* Tour Selection (Optional) */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
            <Compass className="w-3 h-3 text-[#C89B3C]" />
            <span>Tour Experienced (Optional)</span>
          </label>
          <select
            value={selectedTour}
            onChange={(e) => setSelectedTour(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/70 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all cursor-pointer"
          >
            <option value="">-- General Desert Safari / Other --</option>
            {tourOptions.map((t, idx) => (
              <option key={idx} value={t} className="bg-white dark:bg-[#17120D]">
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Optional Email */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Email Address (Optional)
          </label>
          <input
            type="email"
            placeholder="e.g. your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/70 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all"
          />
        </div>

        {/* Review Comments */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Your Review & Feedback *
          </label>
          <textarea
            required
            rows={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell future travelers about your tour! How was the dune bashing, driver hospitality, camel ride, dinner, and shows?"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-[#C89B3C]/20 bg-[#FBF7F0]/60 dark:bg-[#17120D]/70 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all resize-none"
          />
          <div className="flex items-center justify-between text-[9px] text-slate-400 mt-0.5">
            <span>Min. 10 characters</span>
            <span>{comment.length} / 1000</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={submitting}
            className="btn-gold w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Publishing Review...</span>
              </>
            ) : (
              <>
                <Send className="w-3 h-3" />
                <span>Submit My 5-Star Review</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-slate-400 text-center mt-1.5 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#C89B3C]" />
            <span>Thank you for sharing your genuine feedback!</span>
          </p>
        </div>
      </form>
    </div>
  );
}
