import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, Clock, ArrowLeft, Share2, Compass, ArrowRight, BookOpen } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts, getCommentsByPostId } from "@/lib/data/store";
import { formatDate, optimizeImageUrl } from "@/lib/utils";
import CommentSection from "@/components/blog/CommentSection";
import CTASection from "@/components/home/CTASection";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_CONFIG } from "@/lib/config/site";

export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug, false);

  if (!post || post.status !== "published") {
    return {
      title: "Article Not Found | Safari Dune Tours",
      robots: { index: false, follow: false },
    };
  }

  const title = post.meta_title || post.seo_title || `${post.title} | Safari Dune Tours`;
  const description = post.meta_description || post.seo_description || post.excerpt;
  const canonicalUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;
  const imageUrl = post.featured_image || `${SITE_CONFIG.url}/images/hero-desert.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      type: "article",
      publishedTime: post.published_at || post.published_date,
      modifiedTime: post.updated_at || post.published_at || post.published_date,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.featured_image_alt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function SingleBlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  // strictly enforce published only: public visitors must never see drafts
  const post = await getBlogPostBySlug(slug, false);

  if (!post || post.status !== "published") {
    notFound();
  }

  const allPosts = await getBlogPosts();
  // Related articles: same category or other published posts, excluding current post
  const relatedArticles = allPosts
    .filter((p) => p.id !== post.id && p.status === "published")
    .slice(0, 2);

  const approvedComments = await getCommentsByPostId(post.id);

  // Article & BreadcrumbList JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.featured_image,
        datePublished: post.published_at || post.published_date,
        dateModified: post.updated_at || post.published_at || post.published_date,
        author: {
          "@type": "Person",
          name: post.author,
        },
        publisher: {
          "@type": "Organization",
          name: "Safari Dune Tours",
          logo: {
            "@type": "ImageObject",
            url: "https://safaridunetours.com/icon.svg",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_CONFIG.url}/blog/${post.slug}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_CONFIG.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Travel Blog",
            item: `${SITE_CONFIG.url}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `${SITE_CONFIG.url}/blog/${post.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#FCFBF8] dark:bg-[#080B11] text-slate-900 dark:text-white py-12 sm:py-16 transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Travel Blog", href: "/blog" },
            { label: post.title },
          ]}
          className="mb-6"
        />

        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Travel Guides</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            {post.category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-800 dark:text-amber-400 border border-amber-500/30">
                {post.category}
              </span>
            )}

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                {formatDate(post.published_at || post.published_date || "")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                {post.read_time || "5 min read"}
              </span>
              <span>By {post.author}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight font-heading">
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
          <div className="relative h-80 sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl mb-12 border border-slate-200 dark:border-slate-800 bg-slate-900">
            <img
              src={post.featured_image}
              alt={post.featured_image_alt || post.title}
              width={1200}
              height={600}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <article className="prose prose-lg max-w-none text-slate-700 dark:text-slate-200 leading-relaxed space-y-6">
          {post.content
            .trim()
            .split("\n\n")
            .map((paragraph, idx) => {
              const trimmed = paragraph.trim();

              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-10 mb-4 font-heading">
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-3 font-heading">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("> ")) {
                return (
                  <blockquote
                    key={idx}
                    className="pl-4 border-l-4 border-amber-500 italic text-slate-600 dark:text-slate-400 my-5"
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

        {/* Internal Link CTA Banner */}
        <div className="my-14 p-6 sm:p-8 rounded-3xl bg-[#F4EFE6] dark:bg-[#0B0F17] text-slate-900 dark:text-white border border-amber-900/10 dark:border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors duration-200 shadow-sm">
          <div>
            <span className="text-xs uppercase font-bold text-amber-700 dark:text-amber-400 tracking-widest block mb-1">
              Ready to Experience Dubai?
            </span>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              Explore Our Signature Evening Desert Safari
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Includes hotel pickup, 4x4 red dune bashing, camel riding, BBQ dinner, and live shows.
            </p>
          </div>
          <Link
            href="/packages/evening-desert-safari"
            className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:from-amber-400 hover:to-amber-500 transition-all shadow"
          >
            View Package Details
          </Link>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="my-14 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-heading">
              Related Travel Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <article
                  key={rel.id}
                  className="group bg-white dark:bg-[#0E131F] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={optimizeImageUrl(rel.featured_image, 400)}
                      alt={rel.featured_image_alt || rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {rel.category && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-black/70 text-amber-300 backdrop-blur-sm">
                        {rel.category}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 mb-2 font-heading">
                        <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>
                    <Link
                      href={`/blog/${rel.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase text-amber-700 dark:text-amber-400 hover:text-amber-800"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Comment Section (Moderated) */}
        <CommentSection postId={post.id} approvedComments={approvedComments} />
      </div>

      <div className="mt-20">
        <CTASection />
      </div>
    </div>
  );
}
