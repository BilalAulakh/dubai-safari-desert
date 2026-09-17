"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  CheckCircle,
  AlertCircle,
  Eye,
  RefreshCw,
  Sparkles,
  Globe,
  Tag,
  User,
  Calendar,
  Trash2,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import BlogContentEditor from "@/components/admin/BlogContentEditor";
import { BlogPost } from "@/types";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [initialPost, setInitialPost] = useState<BlogPost | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Travel Guide");
  const [customCategory, setCustomCategory] = useState("");
  const [author, setAuthor] = useState("Safari Dune Tours");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");

  // SEO fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Publishing
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [publishedAt, setPublishedAt] = useState(
    new Date().toISOString().slice(0, 16)
  );

  // Feedback states
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/blogs/${id}`);
        const data = await res.json();
        if (!res.ok || !data.success || !data.blog) {
          throw new Error(data.error || "Failed to load article.");
        }

        const b: BlogPost = data.blog;
        setInitialPost(b);
        setTitle(b.title || "");
        setSlug(b.slug || "");
        setCategory(b.category || "Travel Guide");
        setAuthor(b.author || "Safari Dune Tours");
        setExcerpt(b.excerpt || "");
        setContent(b.content || "");
        setFeaturedImage(b.featured_image || "");
        setFeaturedImageAlt(b.featured_image_alt || b.title || "");
        setMetaTitle(b.meta_title || b.seo_title || "");
        setMetaDescription(b.meta_description || b.seo_description || "");
        setStatus(b.status || "draft");
        if (b.published_at) {
          setPublishedAt(b.published_at.slice(0, 16));
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load article data.");
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [id]);

  const categoryOptions = [
    "Travel Guide",
    "Comparison",
    "Family Safari",
    "Adventure",
    "Planning & Tips",
    "Culture & Food",
    "Custom",
  ];

  const effectiveCategory = category === "Custom" ? customCategory : category;

  const handleSubmit = async (overrideStatus?: "draft" | "published") => {
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Please provide an article title.");
      return;
    }

    if (!slug.trim()) {
      setError("A valid URL slug is required.");
      return;
    }

    const targetStatus = overrideStatus || status;

    if (targetStatus === "published" && !content.trim()) {
      setError("Article content cannot be empty when publishing.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        category: effectiveCategory.trim() || "Travel Guide",
        author: author.trim() || "Safari Dune Tours",
        excerpt: excerpt.trim(),
        content: content.trim(),
        featured_image: featuredImage,
        featured_image_alt: featuredImageAlt.trim() || title.trim(),
        meta_title: metaTitle.trim() || title.trim(),
        meta_description: metaDescription.trim() || excerpt.trim(),
        status: targetStatus,
        published_at: targetStatus === "published" ? new Date(publishedAt).toISOString() : undefined,
      };

      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update blog post.");
      }

      setStatus(targetStatus);
      setSuccess("Article updated successfully!");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while updating the article.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete article.");
      }
      router.push("/admin/blog");
    } catch (err: any) {
      alert(err.message || "Failed to delete article.");
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400 text-xs">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        Loading article data...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Blog Articles</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Edit Blog Article
            </h1>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                status === "published"
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                  : "bg-amber-500/15 text-amber-800 dark:text-amber-400 border border-amber-500/30"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <Link
            href={`/admin/blog/${id}/preview`}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F17] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4 text-amber-500" />
            <span>Preview</span>
          </Link>

          {status === "published" && (
            <Link
              href={`/blog/${slug}`}
              target="_blank"
              className="hidden md:inline-flex items-center gap-1 px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-amber-600 text-xs font-semibold"
            >
              <span>View Public</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1.5"
            id="admin-save-blog-btn"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Update Article"}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/40 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            title="Delete Article"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Success / Error Alerts */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Details */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Article Details</span>
            </h2>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Article Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                URL Slug *
              </label>
              <div className="flex items-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 overflow-hidden text-xs">
                <span className="px-3 text-slate-400 select-none font-mono">
                  safaridunetours.com/blog/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full py-2.5 pr-3 bg-transparent text-slate-900 dark:text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Summary / Excerpt
                </label>
                <span className="text-[11px] text-slate-400">
                  {excerpt.length} / 160 recommended
                </span>
              </div>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Content Body Editor */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <BlogContentEditor
              value={content}
              onChange={setContent}
              label="Article Content Body"
            />
          </div>

          {/* SEO Metadata */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-500" />
                <span>Search Engine Optimization (SEO)</span>
              </h2>
              <span className="text-[11px] text-slate-400">Google SERP Ready</span>
            </div>

            {/* Meta Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Meta Title
                </label>
                <span className={`text-[11px] ${metaTitle.length > 60 ? "text-amber-500 font-bold" : "text-slate-400"}`}>
                  {metaTitle.length || title.length} / 60 chars
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={title}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Meta Description
                </label>
                <span className={`text-[11px] ${metaDescription.length > 160 ? "text-amber-500 font-bold" : "text-slate-400"}`}>
                  {metaDescription.length || excerpt.length} / 160 chars
                </span>
              </div>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder={excerpt}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Google Preview */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Google Search Result Preview
              </span>
              <div className="text-[11px] text-[#202124] dark:text-[#bdc1c6] truncate">
                https://safaridunetours.com &gt; blog &gt; {slug}
              </div>
              <div className="text-sm font-semibold text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer line-clamp-1">
                {metaTitle || title || "Article Title | Safari Dune Tours"}
              </div>
              <div className="text-xs text-[#4d5156] dark:text-[#9aa0a6] line-clamp-2 leading-relaxed">
                {metaDescription || excerpt || "Your meta description snippet will be displayed here in search results..."}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          {/* Publishing */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Publishing Status</span>
            </h2>

            <div className="space-y-2">
              <label
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  status === "draft"
                    ? "border-amber-500 bg-amber-500/10 font-bold text-amber-800 dark:text-amber-400"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={status === "draft"}
                  onChange={() => setStatus("draft")}
                  className="text-amber-500 focus:ring-amber-500"
                />
                <div className="text-xs">
                  <div className="font-bold">Draft</div>
                  <div className="text-[11px] opacity-80">
                    Confidential, not visible publicly or on Google
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  status === "published"
                    ? "border-emerald-500 bg-emerald-500/10 font-bold text-emerald-800 dark:text-emerald-400"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={status === "published"}
                  onChange={() => setStatus("published")}
                  className="text-emerald-500 focus:ring-emerald-500"
                />
                <div className="text-xs">
                  <div className="font-bold">Published</div>
                  <div className="text-[11px] opacity-80">
                    Live on /blog, indexable, added to sitemap
                  </div>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Publication Date
              </label>
              <input
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Taxonomy & Author */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-500" />
              <span>Taxonomy & Author</span>
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              {category === "Custom" && (
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Enter custom category name..."
                  className="w-full mt-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Author Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Featured Cover Image</span>
            </h2>

            <ImageUpload
              value={featuredImage}
              onChange={setFeaturedImage}
              label="Cover Image"
              folder="blogs"
              bucket="safari-images"
            />

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Featured Image Alt Text (SEO)
              </label>
              <input
                type="text"
                value={featuredImageAlt}
                onChange={(e) => setFeaturedImageAlt(e.target.value)}
                placeholder="Describe image for screen readers & SEO..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  Delete Blog Article
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Are you sure you want to permanently delete this article?
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 space-y-1 text-xs">
              <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{title}</div>
              <div className="text-slate-500 text-[11px] font-mono">/blog/{slug}</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Article"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
