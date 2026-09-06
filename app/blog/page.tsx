import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/data/store";
import { formatDate } from "@/lib/utils";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Dubai Desert Safari Guides & Travel Blog",
  description:
    "Expert travel advice, desert weather guides, packing tips, and comparison articles for travelers visiting Dubai.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="bg-[#FCFBF8]">
      {/* Banner */}
      <section className="relative py-20 bg-[#0B0F17] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guides & Travel Advice</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Dubai Desert Safari Travel Blog
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Insider tips from licensed safari marshals: timing your visit, packing essentials, family safety, and tour comparisons.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {formatDate(post.published_date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {post.read_time}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-3 leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">By {post.author}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 hover:text-amber-800"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
