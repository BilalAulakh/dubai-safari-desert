import { MetadataRoute } from 'next'

const BASE_URL = 'https://safaridunetours.com'

// TODO: Apne actual data source (database / CMS / API) se replace karein.
// Ye function aapke saare package slugs return karega.
async function getAllPackageSlugs(): Promise<string[]> {
  // Example: agar aapke paas ek API route hai jo packages return karti hai
  // const res = await fetch(`${BASE_URL}/api/packages`)
  // const packages = await res.json()
  // return packages.map((p: { slug: string }) => p.slug)

  // Abhi ke liye homepage se dekhe gaye slugs manually daal diye hain,
  // aapko ise apne database query se replace karna hoga:
  return [
    'evening-desert-safari',
    'morning-desert-safari',
    'overnight-desert-safari',
    'private-desert-safari',
    'quad-bike-desert-safari',
    'buy-1-get-1-free-desert-safari',
    'vip-desert-safari',
    'evening-desert-safari-with-atv-quad-bike-ride',
    'vip-evening-desert-safari-dubai-with-atv-quad-bike-ride',
    'private-morning-desert-safari-dubai',
    'halfday-desert-safari-dubai',
    '01-seater-dune-buggy-rzr-1000cc-self-drive',
    '02-seater-dune-buggy-rzr-1000cc-self-drive',
    'private-evening-desert-safari-dubai',
    'vip-private-desert-safari-dubai',
    'atv-quad-bike-self-drive-1-person',
    '04-seater-dune-buggy-rzr-1000cc-self-drive',
    'atv-quad-bike-self-drive-2-persons',
  ]
}

// TODO: Blog articles publish hone ke baad, yahan se unke slugs bhi fetch karein.
async function getAllBlogSlugs(): Promise<string[]> {
  // const res = await fetch(`${BASE_URL}/api/blog`)
  // const posts = await res.json()
  // return posts.map((p: { slug: string }) => p.slug)
  return []
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const packageSlugs = await getAllPackageSlugs()
  const blogSlugs = await getAllBlogSlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/packages`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/activities`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/gallery`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${BASE_URL}/reviews`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/faq`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.4 },
  ]

  const packageRoutes: MetadataRoute.Sitemap = packageSlugs.map((slug) => ({
    url: `${BASE_URL}/packages/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...packageRoutes, ...blogRoutes]
}
