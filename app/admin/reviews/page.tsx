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
import api from "@/lib/axios";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
    </div>
  );
}
