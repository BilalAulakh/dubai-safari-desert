import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, Clock, ArrowLeft, Share2, Compass } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts, getCommentsByPostId } from "@/lib/data/store";
import { formatDate } from "@/lib/utils";
import CommentSection from "@/components/blog/CommentSection";
import CTASection from "@/components/home/CTASection";

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
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.seo_title || `${post.title} | DubaiSafariDesert`,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.featured_image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function SingleBlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const approvedComments = await getCommentsByPostId(post.id);

  return (
    <div className="bg-[#FCFBF8] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-amber-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Travel Guides</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              {formatDate(post.published_date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              {post.read_time}
            </span>
            <span>By {post.author}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            {post.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        <div className="relative h-80 sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl mb-12 border border-slate-200 bg-slate-900">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <article className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
          {post.content
            .trim()
            .split("\n\n")
            .map((paragraph, idx) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-2xl font-bold text-slate-900 mt-8 mb-3">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n- ").map((item) => item.replace("- ", ""));
                return (
                  <ul key={idx} className="space-y-2 list-disc pl-5 my-4">
                    {items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-slate-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-base text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
        </article>

        {/* Internal Link CTA Banner */}
        <div className="my-12 p-6 sm:p-8 rounded-3xl bg-[#0B0F17] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-bold text-amber-400 tracking-widest block mb-1">
              Ready to Experience Dubai?
            </span>
            <h4 className="text-xl font-bold text-white">
              Explore Our Signature Evening Desert Safari
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Includes hotel pickup, 4x4 dune bashing, camel riding, BBQ dinner, and live shows.
            </p>
          </div>
          <Link
            href="/packages/evening-desert-safari"
            className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:from-amber-400 hover:to-amber-500 transition-all shadow"
          >
            View Package Details
          </Link>
        </div>

        {/* Comment Section (Moderated) */}
        <CommentSection postId={post.id} approvedComments={approvedComments} />
      </div>

      <div className="mt-20">
        <CTASection />
      </div>
    </div>
  );
}
