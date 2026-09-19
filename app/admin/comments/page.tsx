"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Trash2, MessageSquare } from "lucide-react";
import { Comment, CommentStatus } from "@/types";
import { formatDate } from "@/lib/utils";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "comm-1",
      post_id: "post-what-to-wear",
      customer_name: "James Wilson",
      email: "james.w@example.com",
      comment:
        "Great advice on footwear! Last year I wore sneakers and spent an hour shaking sand out. Slip-on sandals are definitely the way to go.",
      status: "approved",
      created_at: "2026-08-22T14:30:00Z",
    },
    {
      id: "comm-2",
      post_id: "post-best-time",
      customer_name: "Amina Tariq",
      email: "amina@example.com",
      comment:
        "Is November weather already pleasant in the evening? We are planning a safari around November 15th.",
      status: "pending",
      created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
    },
  ]);

  const [deleteTarget, setDeleteTarget] = useState<Comment | null>(null);

  const handleUpdateStatus = (id: string, status: CommentStatus) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setComments((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Blog Comments Moderation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review reader responses to travel articles. Only approved comments display publicly.
        </p>
      </div>

      <div className="space-y-4">
        {comments.map((comm) => (
          <div
            key={comm.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{comm.customer_name}</span>
                <span className="text-xs text-slate-400">({comm.email})</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    comm.status === "approved"
                      ? "bg-emerald-100 text-emerald-800"
                      : comm.status === "rejected"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {comm.status}
                </span>
              </div>

              <p className="text-sm text-slate-700">{comm.comment}</p>
              <div className="text-xs text-slate-400 flex items-center gap-3">
                <span>Post: {comm.post_id}</span>
                <span>{formatDate(comm.created_at)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {comm.status !== "approved" && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(comm.id, "approved")}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </button>
              )}

              {comm.status !== "rejected" && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(comm.id, "rejected")}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-800 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setDeleteTarget(comm)}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                title="Delete Comment"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Popup Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Comment"
        itemName={deleteTarget ? `Comment by ${deleteTarget.customer_name}` : undefined}
        message={
          deleteTarget
            ? `Are you sure you want to permanently delete the comment by "${deleteTarget.customer_name}"?`
            : undefined
        }
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
