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
  Plus,
  Package as PackageIcon,
  Compass,
  Image as ImageIcon,
  HelpCircle,
  MapPin,
  Sparkles,
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
      {/* Title & Quick Add Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Safari Operations Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time management portal for packages, bookings, activities, and safari content.
          </p>
        </div>

        {/* Quick Add Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/packages/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-md transition-all"
            id="admin-overview-add-package-btn"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create New Package</span>
          </Link>

          <Link
            href="/admin/activities"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold shadow-sm transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>Add Activity</span>
          </Link>

          <Link
            href="/admin/gallery"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold shadow-sm transition-all"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
            <span>Add Photo</span>
          </Link>

          <Link
            href="/admin/faqs"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold shadow-sm transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Add FAQ</span>
          </Link>
        </div>
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

      {/* Content Management Quick Hub */}
      <div className="bg-white dark:bg-[#0F1624] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Add & Manage Website Content</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct routes to create new safari packages, activities, gallery photos, and FAQs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/packages/new"
            className="group p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 hover:border-amber-400 dark:hover:border-amber-500 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold mb-3 shadow">
                <Plus className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                + Add Safari Package
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Add new tour title, price (AED), duration, photos & inclusions.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Open Form &rarr;
            </span>
          </Link>

          <Link
            href="/admin/activities"
            className="group p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                + Add Desert Activity
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Add Quad bikes, buggies, camel rides, sandboarding or stage shows.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Manage Activities &rarr;
            </span>
          </Link>

          <Link
            href="/admin/gallery"
            className="group p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-3">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                + Add Gallery Photo
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Add guest photos, dunes shots, camps and safari highlights.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Upload Photos &rarr;
            </span>
          </Link>

          <Link
            href="/admin/faqs"
            className="group p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-3">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                + Add FAQ Question
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Add questions, answers, and Dubai hotel pickup locations.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Manage FAQs &rarr;
            </span>
          </Link>
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
