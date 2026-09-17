import Link from "next/link";
import { Search, ExternalLink, Globe, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";

export default function AdminSEOPage() {
  const metaItems = [
    {
      page: "Home Page (/)",
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      canonical: `${SITE_CONFIG.url}/`,
    },
    {
      page: "Safari Packages (/packages)",
      title: "Dubai Desert Safari Packages & Tour Prices | Safari Dune",
      description: "Explore evening BBQ dinners, morning sunrise safaris, overnight camps, and VIP private safaris.",
      canonical: `${SITE_CONFIG.url}/packages`,
    },
    {
      page: "Activities (/activities)",
      title: "Dubai Desert Safari Activities | Dune Bashing, Camel Ride & Quad Biking",
      description: "Discover the best desert safari activities in Dubai: 4x4 red dune bashing, camel trekking, and fire shows.",
      canonical: `${SITE_CONFIG.url}/activities`,
    },
    {
      page: "Travel Blog (/blog)",
      title: "Dubai Desert Safari Guides & Travel Blog | Safari Dune",
      description: "Expert travel advice, desert weather guides, packing tips, and comparison articles.",
      canonical: `${SITE_CONFIG.url}/blog`,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          SEO & Metadata Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review technical search engine tags, canonical URLs, and dynamic sitemaps.
        </p>
      </div>

      {/* Quick links to robots.txt and sitemap.xml */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="/sitemap.xml"
          target="_blank"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-amber-500/40 transition-colors flex items-center justify-between"
        >
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-amber-600" />
              <span>Dynamic Sitemap (sitemap.xml)</span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Automatically generated XML feed for Google search crawlers.
            </p>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400" />
        </a>

        <a
          href="/robots.txt"
          target="_blank"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-amber-500/40 transition-colors flex items-center justify-between"
        >
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-amber-600" />
              <span>Search Directives (robots.txt)</span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Configured to index public content while disallowing /admin.
            </p>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400" />
        </a>
      </div>

      {/* Pages Metadata Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
        <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
          Core Public Pages Metadata
        </h3>

        <div className="space-y-6">
          {metaItems.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider">
                  {item.page}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Indexable</span>
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-600">{item.description}</p>
              <span className="text-[10px] text-slate-400 font-mono block">
                Canonical: {item.canonical}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
