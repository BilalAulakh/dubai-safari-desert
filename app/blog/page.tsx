import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { getBlogPosts } from "@/lib/data/store";
import { formatDate, optimizeImageUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config/site";
import CTASection from "@/components/home/CTASection";

export const revalidate = 60; // Refresh every 60 seconds

export const metadata: Metadata = {
  title: "Dubai Desert Safari Guides & Travel Blog | Safari Dune Tours",
  description:
    "Expert travel advice, desert packing tips, family guides, and activity ideas for experiencing Dubai desert safari with Safari Dune Tours.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
  openGraph: {
    title: "Dubai Desert Safari Guides & Travel Blog | Safari Dune Tours",
    description:
      "Expert travel advice, desert packing tips, family guides, and activity ideas for experiencing Dubai desert safari with Safari Dune Tours.",
    url: `${SITE_CONFIG.url}/blog`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dubai Desert Safari Guides & Travel Blog | Safari Dune Tours",
    description:
      "Expert travel advice, desert packing tips, family guides, and activity ideas for experiencing Dubai desert safari with Safari Dune Tours.",
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="bg-[#FCFBF8] dark:bg-[#080B11] text-slate-900 dark:text-white transition-colors duration-200 min-h-screen">
      {/* Banner */}
      <section className="relative py-20 sm:py-24 bg-[#F4EFE6] dark:bg-[#0B0F17] text-slate-900 dark:text-white border-b border-amber-900/10 dark:border-amber-500/20 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Guides & Travel Advice</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto font-heading">
            Dubai Desert Safari Travel Blog & Guides
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Insider tips from licensed safari marshals: timing your visit, packing essentials, family safety, and tour comparisons.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <p className="text-lg font-semibold">No published blog articles yet.</p>
            <p className="text-sm mt-1">Check back soon for upcoming desert safari travel advice!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group bg-white dark:bg-[#0E131F] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                    <img
                      src={optimizeImageUrl(post.featured_image, 600)}
                      alt={post.featured_image_alt || post.title}
                      width={600}
                      height={350}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {post.category && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/70 backdrop-blur-sm text-amber-300 border border-amber-500/30">
                        {post.category}
                      </span>
                    )}
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        {formatDate(post.published_at || post.published_date || "")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        {post.read_time || "5 min read"}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-3 leading-snug font-heading">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    By {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <CTASection />
    </div>
  );
}
