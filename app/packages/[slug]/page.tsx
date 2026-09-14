import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Calendar,
  MessageCircle,
  HelpCircle,
  Users,
  Sparkles,
} from "lucide-react";
import { getPackageBySlug, getPackages, getFAQs } from "@/lib/data/store";
import { formatPrice, createWhatsAppUrl, optimizeImageUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config/site";
import StickyBookingBar from "@/components/packages/StickyBookingBar";
import CTASection from "@/components/home/CTASection";

export const revalidate = 3600;

interface PackagePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const packages = await getPackages();
  return packages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    return {
      title: "Package Not Found",
    };
  }

  const title = pkg.seo_title || `${pkg.name} | DubaiSafariDesert`;
  const description =
    pkg.seo_description || `${pkg.short_description} Starting from ${formatPrice(pkg.price)} per person.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: pkg.main_image,
          width: 1200,
          height: 630,
          alt: pkg.name,
        },
      ],
    },
    alternates: {
      canonical: `/packages/${pkg.slug}`,
    },
  };
}

export default async function PackageDetailPage({ params }: PackagePageProps) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const allFaqs = await getFAQs();
  const packageFaqs = allFaqs.slice(0, 5);

  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.packageInquiry(pkg.name)
  );

  return (
    <div className="bg-[#FCFBF8] dark:bg-[#080B11] text-slate-900 dark:text-white pb-20 transition-colors duration-200">
      {/* Top Hero Banner */}
      <section className="relative min-h-[45vh] flex items-end bg-[#0B0F17] py-16">
        <div className="absolute inset-0 z-0">
          <img
            src={optimizeImageUrl(pkg.main_image, 1280)}
            alt={pkg.name}
            width={1280}
            height={600}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Premium Dubai Tour</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {pkg.name}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
              {pkg.short_description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-white">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{pkg.duration}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Free Hotel Pickup</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <span className="text-sm font-extrabold">{formatPrice(pkg.price)}</span>
                <span className="text-[11px] font-normal text-slate-300">/ adult</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main 2 Columns */}
          <div className="lg:col-span-2 space-y-12">
            {/* Gallery Thumbnails */}
            {pkg.gallery && pkg.gallery.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Tour Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {pkg.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="relative h-28 rounded-xl overflow-hidden shadow-sm bg-slate-900 border border-slate-200"
                    >
                      <img
                        src={optimizeImageUrl(img, 400)}
                        alt={`${pkg.name} preview ${i + 1}`}
                        width={400}
                        height={250}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Overview Description */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Tour Overview</h2>
              <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
                {pkg.description}
              </p>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>What is Included</span>
                </h3>
                <ul className="space-y-2.5">
                  {pkg.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white p-6 rounded-2xl border border-rose-900/10 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <span>What is Excluded</span>
                </h3>
                <ul className="space-y-2.5">
                  {pkg.exclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Detailed Itinerary Timeline */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Detailed Itinerary</h2>
                <div className="relative border-l-2 border-amber-500/30 ml-3 space-y-8 pl-6">
                  {pkg.itinerary.map((step, index) => (
                    <div key={index} className="relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-white shadow" />
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                        {step.time}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1">{step.title}</h4>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pickup & Cancellation Terms */}
            <div className="bg-[#F8F5EE] p-6 rounded-2xl border border-amber-900/10 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Pickup & Drop-off Information</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pkg.pickup_info}
                </p>
              </div>

              <div className="pt-3 border-t border-amber-900/10">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Cancellation & Refund Policy</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pkg.cancellation_policy}
                </p>
              </div>
            </div>

            {/* Package FAQ */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <span>Tour Questions & Answers</span>
              </h2>
              <div className="space-y-4">
                {packageFaqs.map((faq) => (
                  <div key={faq.id} className="pb-3 border-b border-slate-100 last:border-0">
                    <h4 className="text-sm font-bold text-slate-900">{faq.question}</h4>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-amber-900/15 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Starting Price
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-slate-950">
                    {formatPrice(pkg.price)}
                  </span>
                  <span className="text-xs text-slate-500">/ guest</span>
                </div>
                <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Free Cancellation up to 24 Hours</span>
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold text-slate-900">{pkg.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Vehicle:</span>
                  <span className="font-semibold text-slate-900">4x4 Land Cruiser</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pickup:</span>
                  <span className="font-semibold text-slate-900">Door-to-door included</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Payment:</span>
                  <span className="font-semibold text-slate-900">Pay on Confirmation</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Link
                  href={`/booking?package=${encodeURIComponent(pkg.id)}`}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm uppercase tracking-wider text-center block shadow hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-[1.02]"
                  id="package-detail-book-now"
                >
                  Book This Safari
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>

              <div className="pt-2 text-center text-[11px] text-slate-400">
                No credit card required for inquiry submission.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Sticky Booking Bar */}
      <StickyBookingBar pkg={pkg} />
    </div>
  );
}
