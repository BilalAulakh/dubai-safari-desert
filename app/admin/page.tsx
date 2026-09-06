import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Star,
  Users,
  MessageSquare,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { getBookings, getAllReviews, getPackages } from "@/lib/data/store";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [bookings, reviews, packages] = await Promise.all([
    getBookings(),
    getAllReviews(),
    getPackages(),
  ]);

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const contactedBookings = bookings.filter((b) => b.status === "contacted").length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled").length;
  const completedBookings = bookings.filter((b) => b.status === "completed").length;

  const totalReviews = reviews.length;
  const pendingReviews = reviews.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title & Welcome */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Safari Operations Overview
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Real-time summary of booking inquiries, customer reviews, and safari schedules.
        </p>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Total Requests</span>
            <CalendarCheck className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{totalBookings}</p>
          <span className="text-[10px] text-slate-400">All-time inquiries</span>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-800 font-semibold">Pending Review</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-amber-900 mt-2">{pendingBookings}</p>
          <span className="text-[10px] text-amber-700 font-medium">Awaiting contact</span>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-blue-800 font-semibold">Contacted</span>
            <MessageSquare className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-blue-900 mt-2">{contactedBookings}</p>
          <span className="text-[10px] text-blue-700">In WhatsApp discussion</span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-800 font-semibold">Confirmed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-900 mt-2">{confirmedBookings}</p>
          <span className="text-[10px] text-emerald-700">Drivers scheduled</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600 font-semibold">Completed</span>
            <TrendingUp className="w-4 h-4 text-slate-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{completedBookings}</p>
          <span className="text-[10px] text-slate-500">Safaris finished</span>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-purple-800 font-semibold">Reviews</span>
            <Star className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-purple-900 mt-2">{totalReviews}</p>
          <span className="text-[10px] text-purple-700">
            {pendingReviews} pending moderation
          </span>
        </div>
      </div>

      {/* Grid: Recent Bookings & Popular Packages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Booking Requests</h2>
              <p className="text-xs text-slate-500">Latest submissions from the website</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3">Reference</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Package</th>
                  <th className="pb-3">Safari Date</th>
                  <th className="pb-3">Guests</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 font-mono font-bold text-slate-900">
                      {b.booking_reference}
                    </td>
                    <td className="py-3.5 font-semibold text-slate-800">
                      {b.customer_name}
                      <span className="block text-[11px] text-slate-400 font-normal">
                        {b.phone}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-600 max-w-[160px] truncate">
                      {b.package_name}
                    </td>
                    <td className="py-3.5 text-slate-600">{formatDate(b.booking_date)}</td>
                    <td className="py-3.5 text-slate-600">
                      {b.adults}A {b.children > 0 ? `+ ${b.children}C` : ""}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          b.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : b.status === "contacted"
                            ? "bg-blue-100 text-blue-800"
                            : b.status === "cancelled"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Safari Packages Catalog (1 Col) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Active Packages</h2>
              <p className="text-xs text-slate-500">Live tours in the booking system</p>
            </div>
            <Link
              href="/admin/packages"
              className="text-xs font-bold text-amber-700 hover:text-amber-800"
            >
              Manage
            </Link>
          </div>

          <div className="space-y-3">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{pkg.name}</h4>
                  <span className="text-[11px] text-slate-500">{pkg.duration}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-700">AED {pkg.price}</span>
                  <span className="block text-[10px] text-emerald-600 font-medium">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
