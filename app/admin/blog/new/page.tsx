"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  CheckCircle,
  AlertCircle,
  Eye,
  RefreshCw,
  Search,
  Globe,
  Tag,
  User,
  Calendar,
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import BlogContentEditor from "@/components/admin/BlogContentEditor";
import api, { getApiErrorMessage } from "@/lib/axios";

export default function CreateBlogPage() {
  const router = useRouter();

  // Basic info fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugCustomized, setIsSlugCustomized] = useState(false);
  const [category, setCategory] = useState("Travel Guide");
  const [customCategory, setCustomCategory] = useState("");
  const [author, setAuthor] = useState("Safari Dune Tours");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop"
  );
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");

  // SEO fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Publishing state
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [publishedAt, setPublishedAt] = useState(
    new Date().toISOString().slice(0, 16)
  );

  // Status and feedback
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Auto-generate slug from title if not customized
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugCustomized) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generated);
    }
  };

  const regenerateSlug = () => {
    const generated = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generated);
    setIsSlugCustomized(false);
  };

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

  const handleSubmit = async (publishImmediate = false) => {
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

    const targetStatus = publishImmediate ? "published" : status;

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

      const { data } = await api.post("/api/admin/blogs", payload);

      if (!data.success) {
        throw new Error(data.error || "Failed to save blog post.");
      }

      setSuccess("Article saved successfully! Redirecting...");
      setTimeout(() => {
        router.push("/admin/blog");
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(getApiErrorMessage(err, "An error occurred while saving the article."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Header & Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Blog Articles</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Create New Blog Article
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Craft high-ranking travel guides, packing advice, and adventure tips.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit(false)}
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F17] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1.5"
            id="admin-publish-blog-btn"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Publish Article"}</span>
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
        {/* Main Content Column (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Article Essentials */}
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
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. 10 Best Things to Do in the Dubai Desert"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  URL Slug *
                </label>
                <button
                  type="button"
                  onClick={regenerateSlug}
                  className="text-[11px] text-amber-700 dark:text-amber-400 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Regenerate from title</span>
                </button>
              </div>
              <div className="flex items-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 overflow-hidden text-xs">
                <span className="px-3 text-slate-400 select-none font-mono">
                  safaridunetours.com/blog/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setIsSlugCustomized(true);
                  }}
                  placeholder="article-url-slug"
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
                placeholder="A compelling 1-2 sentence preview for search cards and blog feed..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Card 2: Content Body Editor */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <BlogContentEditor
              value={content}
              onChange={setContent}
              label="Article Content Body"
              placeholder="Write your article in Markdown or rich text. Use headings, lists, bold accents, and links..."
            />
          </div>

          {/* Card 3: SEO Metadata & Google SERP Preview */}
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
                placeholder={title || "SEO optimized title..."}
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
                placeholder={excerpt || "Search engine description snippet..."}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Google Search Snippet Preview */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Google Search Result Preview
              </span>
              <div className="text-[11px] text-[#202124] dark:text-[#bdc1c6] truncate">
                https://safaridunetours.com &gt; blog &gt; {slug || "article-slug"}
              </div>
              <div className="text-sm font-semibold text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer line-clamp-1">
                {metaTitle || title || "Article Title Preview | Safari Dune Tours"}
              </div>
              <div className="text-xs text-[#4d5156] dark:text-[#9aa0a6] line-clamp-2 leading-relaxed">
                {metaDescription || excerpt || "Your meta description snippet will be displayed here in search results..."}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings Column (Right 1 col) */}
        <div className="space-y-6">
          {/* Card 4: Publishing Controls */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Publishing Status</span>
            </h2>

            {/* Status Radio */}
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

            {/* Published Date */}
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

          {/* Card 5: Category & Author */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-500" />
              <span>Taxonomy & Author</span>
            </h2>

            {/* Category Selection */}
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

            {/* Author */}
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
                  placeholder="Safari Dune Tours"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Card 6: Featured Image */}
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
    </div>
  );
}
