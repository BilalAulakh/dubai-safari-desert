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
  title: "Booking Request Received | DubaiSafariDesert",
  description: "Your desert safari booking request has been received by our reservation team.",
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
    <div className="bg-[#FCFBF8] py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-900/15 shadow-xl text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
            Status: Request Received (Pending Review)
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Booking Request Received
          </h1>

          <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Thank you for choosing <strong>DubaiSafariDesert</strong>. Your booking request has been received. Our team will contact you shortly to confirm availability and final details.
          </p>

          {/* Reference Badge */}
          <div className="my-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 inline-block">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-800 block">
              Your Booking Reference
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-950 tracking-wider">
              {reference}
            </span>
          </div>

          {/* Booking Summary Card */}
          {booking && (
            <div className="text-left bg-[#F8F5EE] p-6 rounded-2xl border border-amber-900/10 mb-8 space-y-3 text-sm">
              <h3 className="font-bold text-slate-900 text-base pb-2 border-b border-amber-900/10 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-700" />
                <span>Tour Request Summary</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-xs text-slate-500 block">Package:</span>
                  <span className="font-semibold text-slate-900">{booking.package_name}</span>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block">Customer Name:</span>
                  <span className="font-semibold text-slate-900">{booking.customer_name}</span>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block">Safari Date:</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    {formatDate(booking.booking_date)}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block">Party Size:</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    {booking.adults} Adult{booking.adults > 1 ? "s" : ""}, {booking.children} Child{booking.children !== 1 ? "ren" : ""}
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-xs text-slate-500 block">Pickup Location:</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
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
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Us: {SITE_CONFIG.contact.phone}</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-amber-600 transition-colors"
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
