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
} from "lucide-react";
import { Review, ReviewStatus } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    // Initial reviews load
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
      {
        id: "rev-new-submission",
        customer_name: "Amira Al-Mansouri",
        country: "UAE",
        email: "amira.m@example.com",
        rating: 5,
        comment:
          "Wonderful organization. Our driver Tariq gave us a fantastic dune driving tour and took stunning family sunset portraits on the dunes.",
        status: "pending",
        featured: false,
        created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
        is_demo: false,
      },
    ];
    setReviews(demoReviews);
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

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      r.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
        {filtered.map((rev) => (
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
                <span>{formatDate(rev.created_at)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {rev.status !== "approved" && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(rev.id, "approved")}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-colors"
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
                onClick={() => handleDelete(rev.id)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Delete Review"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
