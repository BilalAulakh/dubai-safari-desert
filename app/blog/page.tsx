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
    <div className="bg-[#FBF7F0] dark:bg-[#17120D] text-[#17120D] dark:text-[#FBF7F0] transition-colors duration-200 min-h-screen">
      {/* Banner */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 bg-[#17120D] text-white border-b border-[#C89B3C]/20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C89B3C] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Guides & Travel Advice</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
            Dubai Desert Safari <span className="gold-text-gradient">Travel Blog</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#B8ADA2] max-w-2xl mx-auto leading-relaxed">
            Insider tips from licensed safari marshals: timing your visit, packing essentials, family safety, and tour comparisons.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="py-20 text-center text-[#6B6258] dark:text-[#B8ADA2]">
            <p className="text-lg font-semibold">No published blog articles yet.</p>
            <p className="text-sm mt-1">Check back soon for upcoming desert safari travel advice!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group bg-white dark:bg-[#241A12] rounded-3xl overflow-hidden border border-[#C89B3C]/20 hover:border-[#C89B3C]/50 shadow-sm hover:shadow-[0_16px_36px_rgba(23,18,13,0.15)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-64 w-full overflow-hidden bg-[#17120D]">
                    <img
                      src={optimizeImageUrl(post.featured_image, 600)}
                      alt={post.featured_image_alt || post.title}
                      width={600}
                      height={350}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {post.category && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#17120D]/85 backdrop-blur-sm text-[#E8C48A] border border-[#C89B3C]/40">
                        {post.category}
                      </span>
                    )}
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-4 text-xs text-[#6B6258] dark:text-[#B8ADA2] mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C89B3C]" />
                        {formatDate(post.published_at || post.published_date || "")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C89B3C]" />
                        {post.read_time || "5 min read"}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#17120D] dark:text-[#FBF7F0] group-hover:text-[#C89B3C] transition-colors mb-3 leading-snug font-heading">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-sm text-[#6B6258] dark:text-[#B8ADA2] leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 border-t border-[#C89B3C]/15 dark:border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[#6B6258] dark:text-[#B8ADA2] font-medium">
                    By {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C89B3C] hover:text-[#E8C48A]"
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
