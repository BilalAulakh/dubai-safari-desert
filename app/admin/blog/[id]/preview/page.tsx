import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Eye,
  CheckCircle,
  Edit2,
  Lock,
  Tag,
  Share2,
  Compass,
} from "lucide-react";
import { getBlogPostById } from "@/lib/data/store";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog Article Preview (Admin Mode) | Safari Dune Tours",
  robots: {
    index: false,
    follow: false,
  },
};

interface PreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogPreviewPage({ params }: PreviewPageProps) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  const isDraft = post.status === "draft";

  return (
    <div className="space-y-6 pb-20">
      {/* Top Admin Sticky Notification Bar */}
      <div className="sticky top-0 z-30 p-4 rounded-2xl bg-[#0B0F17] text-white border border-amber-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
              isDraft ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
            }`}
          >
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                Admin Article Preview
              </span>
              <span
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  isDraft
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                }`}
              >
                {post.status}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {isDraft
                ? "Confidential draft — Not visible to public or indexed by search engines."
                : "Live article — Publicly visible on /blog."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/admin/blog"
            className="px-3 py-1.5 rounded-xl border border-white/20 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Back to Dashboard
          </Link>
          <Link
            href={`/admin/blog/${post.id}/edit`}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Article</span>
          </Link>
        </div>
      </div>

      {/* Article Render View (Matching Public Site Aesthetics) */}
      <div className="bg-[#FCFBF8] dark:bg-[#080B11] text-slate-900 dark:text-white rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm max-w-4xl mx-auto transition-colors">
        {/* Breadcrumb preview */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
          <Link href="/admin/blog" className="hover:text-amber-600">
            Admin CMS
          </Link>
          <span>/</span>
          <span>Blog Preview</span>
          <span>/</span>
          <span className="text-slate-600 dark:text-slate-300 truncate max-w-xs">{post.title}</span>
        </div>

        {/* Category Badge & Meta */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-800 dark:text-amber-400 border border-amber-500/30">
              {post.category || "Desert Safari"}
            </span>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                {formatDate(post.published_at || post.published_date || new Date().toISOString())}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {post.read_time || "5 min read"}
              </span>
              <span>By {post.author}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative h-80 sm:h-[420px] w-full rounded-3xl overflow-hidden shadow-xl mb-10 border border-slate-200 dark:border-slate-800 bg-slate-900">
            <img
              src={post.featured_image}
              alt={post.featured_image_alt || post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <article className="prose prose-lg max-w-none text-slate-700 dark:text-slate-200 leading-relaxed space-y-6">
          {post.content
            .trim()
            .split("\n\n")
            .map((block, idx) => {
              const trimmed = block.trim();
              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-3">
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("> ")) {
                return (
                  <blockquote
                    key={idx}
                    className="pl-4 border-l-4 border-amber-500 italic text-slate-600 dark:text-slate-400 my-4"
                  >
                    {trimmed.replace(/^>\s*/gm, "")}
                  </blockquote>
                );
              }
              if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const items = trimmed.split(/\n[-*]\s+/).map((item) => item.replace(/^[-*]\s+/, ""));
                return (
                  <ul key={idx} className="space-y-2 list-disc pl-5 my-4">
                    {items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-slate-700 dark:text-slate-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (/^\d+\.\s+/.test(trimmed)) {
                const items = trimmed.split(/\n\d+\.\s+/).map((item) => item.replace(/^\d+\.\s+/, ""));
                return (
                  <ol key={idx} className="space-y-2 list-decimal pl-5 my-4">
                    {items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-slate-700 dark:text-slate-300">
                        {item}
                      </li>
                    ))}
                  </ol>
                );
              }
              if (trimmed === "---") {
                return <hr key={idx} className="my-8 border-slate-200 dark:border-slate-800" />;
              }
              return (
                <p key={idx} className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
        </article>

        {/* CTA Package Banner */}
        <div className="my-12 p-6 sm:p-8 rounded-3xl bg-[#F4EFE6] dark:bg-[#0B0F17] text-slate-900 dark:text-white border border-amber-900/10 dark:border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors duration-200">
          <div>
            <span className="text-xs uppercase font-bold text-amber-700 dark:text-amber-400 tracking-widest block mb-1">
              Ready to Experience Dubai?
            </span>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              Explore Our Signature Desert Safari Experiences
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Includes 4x4 red dune bashing, camel riding, sandboarding, 5-star BBQ dinner, and live fire shows.
            </p>
          </div>
          <Link
            href="/packages"
            className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:from-amber-400 hover:to-amber-500 transition-all shadow"
          >
            Explore Packages
          </Link>
        </div>
      </div>
    </div>
  );
}
