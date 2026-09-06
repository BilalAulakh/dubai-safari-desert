import { Metadata } from "next";
import { Sparkles, ShieldCheck, Clock, MessageCircle, Phone } from "lucide-react";
import { getPackages, getPickupLocations } from "@/lib/data/store";
import BookingForm from "@/components/booking/BookingForm";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Book Dubai Desert Safari | Inquiry & Instant WhatsApp Confirmation",
  description:
    "Submit your Dubai desert safari booking inquiry with free hotel pickup and zero advance payment. Our safari reservation team confirms details instantly on WhatsApp.",
  alternates: {
    canonical: "/booking",
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
    "Hello DubaiSafariDesert, I would like assistance with making a booking."
  );

  return (
    <div className="bg-[#FCFBF8] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Fast 2-Minute Request</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Book Your Desert Safari
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Submit your safari inquiry below. No upfront payment or credit card is required. Our team will contact you on WhatsApp to confirm timing, pickup address, and final details.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>No Advance Payment Needed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Free 24h Cancellation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-semibold hover:underline"
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
