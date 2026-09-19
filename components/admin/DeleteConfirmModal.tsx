"use client";

import { useEffect } from "react";
import { Trash2, AlertTriangle, X, Loader2 } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  itemName?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  title = "Delete Confirmation",
  itemName,
  message,
  confirmText = "Delete Permanently",
  cancelText = "Cancel",
  isLoading = false,
  onConfirm,
  onClose,
}: DeleteConfirmModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onClose();
        }
      }}
    >
      <div className="bg-white dark:bg-[#1D150E] text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-[#C89B3C]/30 shadow-2xl relative animate-in zoom-in-95 duration-200 text-center space-y-5">
        {/* Close X Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors disabled:opacity-40"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon with Glow */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center shadow-inner relative">
          <div className="absolute inset-0 rounded-2xl bg-rose-500/10 blur-md pointer-events-none" />
          <Trash2 className="w-8 h-8 text-rose-600 dark:text-rose-400 relative z-10" />
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3
            id="delete-dialog-title"
            className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
            {message || (
              <>
                Are you sure you want to delete{" "}
                {itemName ? (
                  <span className="font-bold text-slate-900 dark:text-white underline decoration-rose-500 decoration-2">
                    &ldquo;{itemName}&rdquo;
                  </span>
                ) : (
                  "this item"
                )}
                ? This action cannot be undone.
              </>
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto flex-1 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors disabled:opacity-40 cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto flex-1 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/25 hover:shadow-rose-600/40 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
