import { Metadata } from "next";
import { Sparkles, ShieldCheck, Clock, MessageCircle } from "lucide-react";
import { getPackages, getPickupLocations } from "@/lib/data/store";
import BookingForm from "@/components/booking/BookingForm";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Book Dubai Desert Safari | Safari Dune Tours",
  description:
    "Submit your Dubai desert safari booking inquiry with free hotel pickup and zero advance payment. Our safari reservation team confirms details instantly on WhatsApp.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/booking`,
  },
  openGraph: {
    title: "Book Dubai Desert Safari | Safari Dune Tours",
    description:
      "Submit your Dubai desert safari booking inquiry with free hotel pickup and zero advance payment. Our safari reservation team confirms details instantly on WhatsApp.",
    url: `${SITE_CONFIG.url}/booking`,
    siteName: SITE_CONFIG.name,
  },
};

interface BookingPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const search = await searchParams;
  const packageParam = typeof search?.package === "string" ? search.package : undefined;

  const [packages, pickupLocations] = await Promise.all([
    getPackages(),
    getPickupLocations(),
  ]);

  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    "Hello Safari Dune, I would like assistance with making a booking."
  );

  return (
    <div className="bg-[#FBF7F0] dark:bg-[#17120D] text-[#17120D] dark:text-[#FBF7F0] pt-28 pb-20 sm:pt-36 sm:pb-28 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#C89B3C] dark:text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Fast 2-Minute Request</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#17120D] dark:text-[#FBF7F0] leading-[1.08]">
            Book Your Desert Safari
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6B6258] dark:text-[#B8ADA2] leading-relaxed">
            Submit your safari inquiry below. No advance payment or credit card is required. Our team will contact you directly on WhatsApp to confirm timing, pickup address, and final details.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B6258] dark:text-[#B8ADA2]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C89B3C]" />
              <span className="font-medium">No Advance Payment Needed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#C89B3C]" />
              <span className="font-medium">Free 24h Cancellation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C89B3C] font-semibold hover:underline"
              >
                Prefer to book directly on WhatsApp? Click here
              </a>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <BookingForm
          packages={packages}
          pickupLocations={pickupLocations}
          defaultPackageId={packageParam}
        />
      </div>
    </div>
  );
}
