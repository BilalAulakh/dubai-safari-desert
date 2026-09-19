"use client";

import { useState, useEffect } from "react";
import {
  Star,
  CheckCircle,
  XCircle,
  Trash2,
  Sparkles,
  Filter,
  Search,
  AlertTriangle,
  X,
  Share2,
  Copy,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { Review, ReviewStatus } from "@/types";
import { formatDate } from "@/lib/utils";
import api from "@/lib/axios";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const reviewUrl = `${origin || "http://localhost:3000"}/review`;
  const whatsappTemplate = `Dear guest, thank you for choosing Safari Dune Tours for your Dubai desert adventure! 🐪✨ We hope you had a thrilling and memorable experience. Could you please take 30 seconds to drop us a quick 5-star rating and share your review here? 👉 ${reviewUrl} Your feedback means the world to our drivers and team! Thank you!`;

  const copyToClipboard = async (text: string, isMsg: boolean) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isMsg) {
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2000);
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    async function loadReviews() {
      try {
        const { data } = await api.get("/api/reviews");
        if (data.success && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
          return;
        }
      } catch (err) {
        console.error("Failed to load reviews:", err);
      }
      setReviews([]);
    }
    loadReviews();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: ReviewStatus) => {
    try {
      await api.patch("/api/reviews", { id, status: newStatus });
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error("Failed to update review status:", err);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const rev = reviews.find((r) => r.id === id);
    if (!rev) return;
    const newFeatured = !rev.featured;
    try {
      await api.patch("/api/reviews", { id, featured: newFeatured });
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, featured: newFeatured } : r))
      );
    } catch (err) {
      console.error("Failed to toggle review featured status:", err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!reviewToDelete) return;
    try {
      setIsDeleting(true);
      await api.delete(`/api/reviews?id=${reviewToDelete.id}`);
      setReviews((prev) => prev.filter((r) => r.id !== reviewToDelete.id));
      setReviewToDelete(null);
    } catch (err) {
      console.error("Failed to delete review:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      r.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedReviews = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Review Moderation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Approve, reject, or feature guest testimonials. Only approved reviews appear on the public website.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsShareModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-105 active:scale-95 shrink-0"
          id="btn-get-review-link"
        >
          <Share2 className="w-4 h-4" />
          <span>Get Review Link for Guests</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search reviews by name or text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Reviews</option>
            <option value="pending">Pending Moderation</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Reviews Cards List */}
      <div className="space-y-4">
        {paginatedReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating
                          ? "text-amber-500 fill-amber-500"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    rev.status === "approved"
                      ? "bg-emerald-100 text-emerald-800"
                      : rev.status === "rejected"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {rev.status}
                </span>

                {rev.featured && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Featured on Home</span>
                  </span>
                )}

                {rev.is_demo && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
                    Demo content
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-800 leading-relaxed font-normal italic">
                &ldquo;{rev.comment}&rdquo;
              </p>

              <div className="text-xs text-slate-500 flex items-center gap-4 pt-1">
                <span className="font-bold text-slate-900">{rev.customer_name}</span>
                <span>{rev.country}</span>
                {rev.email && <span>{rev.email}</span>}
                <span className="ml-auto">{formatDate(rev.created_at)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {rev.status !== "approved" && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(rev.id, "approved")}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </button>
              )}

              {rev.status !== "rejected" && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(rev.id, "rejected")}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-800 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => handleToggleFeatured(rev.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                  rev.featured
                    ? "bg-purple-100 text-purple-800"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                title="Toggle Featured"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{rev.featured ? "Unfeature" : "Feature"}</span>
              </button>

              <button
                type="button"
                onClick={() => setReviewToDelete(rev)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Delete Review"
                id={`delete-review-btn-${rev.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} reviews
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold"
            >
              Previous
            </button>
            <span className="font-bold text-slate-900">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal Popup */}
      <DeleteConfirmModal
        isOpen={!!reviewToDelete}
        title="Delete Customer Review"
        itemName={reviewToDelete ? `Review by "${reviewToDelete.customer_name}"` : undefined}
        message={
          reviewToDelete
            ? `Are you sure you want to permanently delete the review by "${reviewToDelete.customer_name}"? This action cannot be undone.`
            : undefined
        }
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setReviewToDelete(null)}
      />

      {/* Share Review Link Modal */}
      {isShareModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative space-y-6">
            <button
              type="button"
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Share2 className="w-3.5 h-3.5" />
                <span>Customer Review Link</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Collect Direct 5-Star Reviews
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Share this special direct link with your safari guests on WhatsApp or SMS right after their tour.
              </p>
            </div>

            {/* Direct Link Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-700 block">
                Direct Review URL
              </label>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <input
                  type="text"
                  readOnly
                  value={reviewUrl}
                  className="bg-transparent text-xs text-slate-700 w-full outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(reviewUrl, false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0 flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedLink ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Ready WhatsApp Message Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-700 block">
                Pre-written WhatsApp Message
              </label>
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs text-slate-700 leading-relaxed">
                {whatsappTemplate}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => copyToClipboard(whatsappTemplate, true)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedMessage ? "Message Copied!" : "Copy Full Message"}</span>
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(whatsappTemplate)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Share</span>
                </a>
              </div>
            </div>

            {/* Direct Open Link */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Test the link yourself:</span>
              <a
                href={reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 hover:underline"
              >
                <span>Open /review page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
