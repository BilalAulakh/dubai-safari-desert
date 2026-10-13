import Link from "next/link";
import { Metadata } from "next";
import {
  CheckCircle2,
  MessageCircle,
  Phone,
  ArrowLeft,
  Calendar,
  Users,
  MapPin,
  Clock,
  FileText,
} from "lucide-react";
import { getBookingByReference } from "@/lib/data/store";
import { formatDate, createWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config/site";

interface ConfirmationPageProps {
  params: Promise<{ reference: string }>;
}

export const metadata: Metadata = {
  title: "Booking Request Received | Safari Dune Tours",
  description: "Your desert safari booking request has been received by our reservation team.",
  robots: { index: false, follow: false },
};

export default async function BookingConfirmationPage({ params }: ConfirmationPageProps) {
  const { reference } = await params;
  const booking = await getBookingByReference(reference);

  const whatsappMessage = SITE_CONFIG.whatsappTemplates.bookingConfirmation(
    reference,
    booking?.package_name || "Safari Package"
  );

  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    whatsappMessage
  );

  return (
    <div className="bg-[#FBF7F0] dark:bg-[#17120D] text-[#17120D] dark:text-[#FBF7F0] min-h-[85vh] py-20 sm:py-28 flex items-center transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white dark:bg-[#241A12] rounded-3xl p-6 sm:p-10 border border-[#C89B3C]/25 shadow-2xl text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block px-3.5 py-1 rounded-full bg-[#C89B3C]/15 text-[#8C6214] dark:text-[#E8C48A] border border-[#C89B3C]/30 text-xs font-bold uppercase tracking-wider mb-2">
            Status: Request Received (Pending Review)
          </span>

          <h1 className="font-heading text-2xl sm:text-4xl font-bold text-[#17120D] dark:text-[#FBF7F0] tracking-tight">
            Booking Request Received
          </h1>

          <p className="mt-3 text-base text-[#6B6258] dark:text-[#B8ADA2] max-w-xl mx-auto leading-relaxed">
            Thank you for choosing <strong>Safari Dune Tours</strong>. Your booking request has been received. Our team will contact you shortly to confirm availability and final details.
          </p>

          {/* Reference Badge */}
          <div className="my-8 p-4 rounded-2xl bg-[#C89B3C]/10 border border-[#C89B3C]/30 inline-block">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8C6214] dark:text-[#E8C48A] block mb-1">
              Your Booking Reference
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold tabular-nums text-[#17120D] dark:text-white tracking-wider">
              {reference}
            </span>
          </div>

          {/* Booking Summary Card */}
          {booking && (
            <div className="text-left bg-[#F2E8D5] dark:bg-[#1D150E] p-6 rounded-2xl border border-[#C89B3C]/20 mb-8 space-y-3 text-sm">
              <h3 className="font-heading font-bold text-[#17120D] dark:text-[#FBF7F0] text-base pb-2 border-b border-[#C89B3C]/20 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C89B3C]" />
                <span>Tour Request Summary</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-xs text-[#6B6258] dark:text-[#B8ADA2] block">Package:</span>
                  <span className="font-semibold text-[#17120D] dark:text-[#FBF7F0]">{booking.package_name}</span>
                </div>

                <div>
                  <span className="text-xs text-[#6B6258] dark:text-[#B8ADA2] block">Customer Name:</span>
                  <span className="font-semibold text-[#17120D] dark:text-[#FBF7F0]">{booking.customer_name}</span>
                </div>

                <div>
                  <span className="text-xs text-[#6B6258] dark:text-[#B8ADA2] block">Safari Date:</span>
                  <span className="font-semibold text-[#17120D] dark:text-[#FBF7F0] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C89B3C]" />
                    {formatDate(booking.booking_date)}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-[#6B6258] dark:text-[#B8ADA2] block">Party Size:</span>
                  <span className="font-semibold text-[#17120D] dark:text-[#FBF7F0] flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#C89B3C]" />
                    {booking.adults} Adult{booking.adults > 1 ? "s" : ""}, {booking.children} Child{booking.children !== 1 ? "ren" : ""}
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-xs text-[#6B6258] dark:text-[#B8ADA2] block">Pickup Location:</span>
                  <span className="font-semibold text-[#17120D] dark:text-[#FBF7F0] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
                    {booking.pickup_location} {booking.hotel_name ? `(${booking.hotel_name})` : ""}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action CTAs: WhatsApp & Call */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="btn-luxury-outline w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl !bg-[#17120D] dark:!bg-white/10 !text-white border-[#C89B3C]/40 hover:border-[#C89B3C] flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C89B3C]" />
              <span>Call Us: {SITE_CONFIG.contact.phone}</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-[#C89B3C]/15 dark:border-white/10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#C89B3C] hover:text-[#E8C48A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
