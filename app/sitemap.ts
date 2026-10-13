import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/config/site";
import { getPackages, getBlogPosts } from "@/lib/data/store";

export const revalidate = 86400; // 1 day; admin saves refresh pages on demand

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url;

function toDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

// Built from the live package and blog data so new or renamed slugs are picked up automatically
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, posts] = await Promise.all([getPackages(), getBlogPosts()]);
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/packages`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/booking`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/activities`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const packageRoutes: MetadataRoute.Sitemap = packages
    .filter((pkg) => pkg.active)
    .map((pkg) => ({
      url: `${BASE_URL}/packages/${pkg.slug}`,
      lastModified: toDate(pkg.updated_at) ?? now,
      changeFrequency: "weekly",
      priority: pkg.featured ? 0.9 : 0.8,
    }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: toDate(post.updated_at) ?? toDate(post.published_at) ?? now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...packageRoutes, ...blogRoutes];
}
