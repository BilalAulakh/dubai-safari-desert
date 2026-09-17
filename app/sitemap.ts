import { MetadataRoute } from "next";
import { getPackages, getBlogPosts } from "@/lib/data/store";
import { SITE_CONFIG } from "@/lib/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url;

  const [packages, blogPosts] = await Promise.all([
    getPackages(),
    getBlogPosts(),
  ]);

  // Static public pages
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/packages",
    "/activities",
    "/about",
    "/gallery",
    "/reviews",
    "/faq",
    "/contact",
    "/booking",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/packages" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/packages" ? 0.9 : 0.8,
  }));

  // Dynamic package pages
  const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic blog post pages (strictly published articles only)
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.published_at || post.published_date || new Date()),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...packageRoutes, ...blogRoutes];
}
