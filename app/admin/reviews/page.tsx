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
} from "lucide-react";
import { Review, ReviewStatus } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
          return;
        }
      } catch (err) {
        console.error("Failed to load reviews:", err);
      }

      // Initial reviews load fallback
      const demoReviews: Review[] = [
        {
          id: "rev-1",
          customer_name: "Sarah Jenkins",
          country: "United Kingdom",
          email: "sarah.j@example.com",
          rating: 5,
          comment:
            "The evening desert safari exceeded all our expectations! The dune bashing was thrilling yet felt completely safe with our driver Rashid. The BBQ dinner was delicious and the fire show under the night sky was spectacular.",
          status: "approved",
          featured: true,
          created_at: "2026-08-15T16:20:00Z",
          is_demo: true,
        },
        {
          id: "rev-2",
          customer_name: "Marco Rossi",
          country: "Italy",
          email: "m.rossi@example.com",
          rating: 5,
          comment:
            "We booked the VIP Private Safari for my family of four. Booking was effortless over WhatsApp, pickup arrived exactly on time, and having our private Land Cruiser made the experience so comfortable for the kids.",
          status: "approved",
          featured: true,
          created_at: "2026-08-20T11:45:00Z",
          is_demo: true,
        },
      ];
      setReviews(demoReviews);
    }
    loadReviews();
  }, []);

  const handleUpdateStatus = (id: string, newStatus: ReviewStatus) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleToggleFeatured = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, featured: !r.featured } : r))
    );
  };

  const handleConfirmDelete = () => {
    if (!reviewToDelete) return;
    setReviews((prev) => prev.filter((r) => r.id !== reviewToDelete.id));
    setReviewToDelete(null);
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
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Review Moderation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Approve, reject, or feature guest testimonials. Only approved reviews appear on the public website.
        </p>
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
      {reviewToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-review-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
        >
          <div className="w-full max-w-md bg-white dark:bg-[#1D150E] rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-[#C89B3C]/30 space-y-5 animate-in zoom-in-95 duration-200 relative">
            {/* Close Cross */}
            <button
              type="button"
              onClick={() => setReviewToDelete(null)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Warning Icon & Heading */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 border border-rose-500/20 flex items-center justify-center shrink-0 shadow-sm">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
              </div>
              <div className="pr-6">
                <h3
                  id="delete-review-modal-title"
                  className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight"
                >
                  Delete Review?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Are you sure you want to permanently delete this review? This action cannot be undone.
                </p>
              </div>
            </div>

            {/* Review Preview Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/35 border border-slate-200/80 dark:border-white/10 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-semibold">
                <span className="font-bold">{reviewToDelete.customer_name}</span>
                <span className="text-[11px] text-amber-500 font-bold">
                  ★ {reviewToDelete.rating} / 5
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 italic line-clamp-2 text-[11px] leading-relaxed">
                &ldquo;{reviewToDelete.comment}&rdquo;
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReviewToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                id="confirm-delete-review-btn"
              >
                Yes, Delete Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
