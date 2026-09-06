"use client";

import { useState, useRef } from "react";
import { Upload, Check, AlertCircle, Loader2, Image as ImageIcon, X, ExternalLink } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  bucket?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Package Image",
  bucket = "safari-images",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [useUrlDirectly, setUseUrlDirectly] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size exceeds 10MB limit.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image to Supabase");
      }

      onChange(data.url);
    } catch (err: any) {
      console.error(err);
      setError(
        err.message ||
          "Upload failed. Make sure Storage RLS policy allows uploads to 'safari-images'."
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {label} *
        </label>
        <button
          type="button"
          onClick={() => setUseUrlDirectly(!useUrlDirectly)}
          className="text-[11px] text-amber-700 dark:text-amber-400 hover:underline font-semibold"
        >
          {useUrlDirectly ? "Switch to File Upload" : "Or Paste Direct URL"}
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {useUrlDirectly ? (
        <div className="space-y-3">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... or Supabase storage public URL"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      ) : (
        <div className="space-y-3">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleFileSelect}
            className="hidden"
          />

          {value ? (
            <div className="relative rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-900 group">
              <div className="relative h-52 sm:h-60 w-full">
                <img
                  src={value}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Replace Image</span>
                </button>

                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Full</span>
                </a>

                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="p-2 rounded-xl bg-rose-500/80 hover:bg-rose-500 text-white"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-sm text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Uploaded to Supabase: {bucket}</span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => !uploading && fileInputRef.current?.click()}
              className={`p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-colors flex flex-col items-center justify-center ${
                uploading
                  ? "border-amber-500 bg-amber-500/5 cursor-wait"
                  : "border-slate-300 dark:border-slate-700 hover:border-amber-500 bg-slate-50 dark:bg-slate-900/60"
              }`}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2 text-amber-600 dark:text-amber-400">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <p className="text-xs font-bold uppercase tracking-wider">
                    Uploading directly to Supabase ({bucket})...
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Click to upload image to <code className="text-amber-600 dark:text-amber-400">{bucket}</code>
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      JPG, PNG, WebP up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
