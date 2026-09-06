"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare, Send, Loader2, CheckCircle2, ShieldAlert } from "lucide-react";
import { commentSchema, CommentFormData } from "@/lib/validations/comment";
import { Comment } from "@/types";
import { formatDate } from "@/lib/utils";

interface CommentSectionProps {
  postId: string;
  approvedComments: Comment[];
}

export default function CommentSection({ postId, approvedComments }: CommentSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      post_id: postId,
      website_honeypot: "",
    },
  });

  const onSubmit = async (data: CommentFormData) => {
    setErrorMessage(null);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to submit comment.");
      }

      setSubmitted(true);
      reset({ post_id: postId, website_honeypot: "" });
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred.");
    }
  };

  return (
    <div className="mt-16 pt-12 border-t border-slate-200 space-y-10">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-amber-600" />
          <span>Reader Discussion ({approvedComments.length})</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Have a question or comment about this guide? Join the conversation below.
        </p>
      </div>

      {/* Approved Comments List */}
      {approvedComments.length > 0 ? (
        <div className="space-y-4">
          {approvedComments.map((comm) => (
            <div
              key={comm.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-slate-900">{comm.customer_name}</span>
                <span className="text-xs text-slate-400">{formatDate(comm.created_at)}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {comm.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-[#F8F5EE] border border-amber-900/10 text-center text-xs text-slate-600">
          No comments yet. Be the first to leave a comment!
        </div>
      )}

      {/* Submission Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Comment Submitted for Review</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              To keep discussions informative and spam-free, all comments are held for review by our moderation team before appearing publicly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider"
            >
              Write Another Comment
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h4 className="text-lg font-bold text-slate-900">Leave a Reply</h4>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs border border-rose-200">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Elena R."
                  {...register("customer_name")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {errors.customer_name && (
                  <p className="mt-1 text-xs text-rose-500">{errors.customer_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address * (Private)
                </label>
                <input
                  type="email"
                  placeholder="e.g. elena@example.com"
                  {...register("email")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Comment *
              </label>
              <textarea
                rows={4}
                placeholder="Share your thoughts or ask a question about this guide..."
                {...register("comment")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              />
              {errors.comment && (
                <p className="mt-1 text-xs text-rose-500">{errors.comment.message}</p>
              )}
            </div>

            {/* Hidden honeypot field */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website_honeypot")}
              className="hidden"
              aria-hidden="true"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Comment for Approval</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
