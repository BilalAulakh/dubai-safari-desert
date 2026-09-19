"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Phone,
  MessageCircle,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  Clock,
  Save,
  Loader2,
  RotateCw,
  Trash2,
} from "lucide-react";
import { Booking, BookingStatus } from "@/types";
import { formatDate, createWhatsAppUrl } from "@/lib/utils";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; reference: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [noteText, setNoteText] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch live bookings from API
  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/bookings", { cache: "no-store" });
      const json = await res.json();
      if (json.success && Array.isArray(json.bookings)) {
        setBookings(json.bookings);
        if (json.bookings.length > 0) {
          // If previously selected booking still exists, update it, otherwise select first
          setSelectedBooking((prev) => {
            if (prev) {
              const updatedMatch = json.bookings.find((b: Booking) => b.id === prev.id);
              if (updatedMatch) return updatedMatch;
            }
            return json.bookings[0];
          });
          setNoteText((prev) => {
            const currentSelected = selectedBooking
              ? json.bookings.find((b: Booking) => b.id === selectedBooking.id)
              : json.bookings[0];
            return currentSelected?.admin_notes || "";
          });
        }
      }
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    // Optimistic UI update
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookingId, status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status on server:", err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedBooking) return;
    setIsSavingNote(true);
    setSaveSuccess(false);

    try {
      await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedBooking.id,
          status: selectedBooking.status,
          admin_notes: noteText,
        }),
      });

      setBookings((prev) =>
        prev.map((b) =>
          b.id === selectedBooking.id ? { ...b, admin_notes: noteText } : b
        )
      );
      setSelectedBooking((prev) => (prev ? { ...prev, admin_notes: noteText } : null));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error("Failed to save note:", err);
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleDeleteBooking = (bookingId: string, reference: string) => {
    setDeleteTarget({ id: bookingId, reference });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setDeletingId(deleteTarget.id);
    try {
      const res = await fetch(`/api/bookings?id=${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        const deletedId = deleteTarget.id;
        setBookings((prev) => prev.filter((b) => b.id !== deletedId));
        if (selectedBooking?.id === deletedId) {
          const remaining = bookings.filter((b) => b.id !== deletedId);
          setSelectedBooking(remaining.length > 0 ? remaining[0] : null);
          setNoteText(remaining.length > 0 ? remaining[0].admin_notes || "" : "");
        }
      } else {
        alert(data.message || "Failed to delete booking.");
      }
    } catch (err) {
      console.error("Failed to delete booking:", err);
      alert("An unexpected error occurred while deleting the booking.");
    } finally {
      setDeletingId(null);
      setDeleteTarget(null);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.booking_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage) || 1;
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Safari Bookings Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review guest inquiries, update contact statuses, and log internal driver dispatch notes.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by reference, name, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={fetchBookings}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            title="Refresh bookings from server"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Main Split View: Bookings List + Details Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table / List (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Reference</th>
                  <th className="py-3.5 px-4">Guest</th>
                  <th className="py-3.5 px-4">Safari Date</th>
                  <th className="py-3.5 px-4">Party</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedBookings.map((b) => {
                  const isSelected = selectedBooking?.id === b.id;
                  return (
                    <tr
                      key={b.id}
                      onClick={() => {
                        setSelectedBooking(b);
                        setNoteText(b.admin_notes || "");
                      }}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? "bg-amber-50/60" : "hover:bg-slate-50/60"
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {b.booking_reference}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {b.customer_name}
                        <span className="block text-[11px] text-slate-400 font-normal">
                          {b.phone}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{formatDate(b.booking_date)}</td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {b.adults}A {b.children > 0 ? `+ ${b.children}C` : ""}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={b.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) =>
                            handleStatusChange(b.id, e.target.value as BookingStatus)
                          }
                          className={`text-[11px] font-bold rounded-lg px-2 py-1 border focus:outline-none ${
                            b.status === "confirmed"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : b.status === "contacted"
                              ? "bg-blue-50 text-blue-800 border-blue-300"
                              : b.status === "cancelled"
                              ? "bg-rose-50 text-rose-800 border-rose-300"
                              : "bg-amber-50 text-amber-800 border-amber-300"
                          }`}
                        >
                          <option value="pending">pending</option>
                          <option value="contacted">contacted</option>
                          <option value="confirmed">confirmed</option>
                          <option value="cancelled">cancelled</option>
                          <option value="completed">completed</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBooking(b);
                              setNoteText(b.admin_notes || "");
                            }}
                            className="text-amber-700 font-bold hover:underline cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBooking(b.id, b.booking_reference);
                            }}
                            disabled={deletingId === b.id}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer disabled:opacity-40"
                            title="Delete booking"
                            aria-label={`Delete booking ${b.booking_reference}`}
                          >
                            {deletingId === b.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-500" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of{" "}
                {filteredBookings.length} bookings
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold"
                >
                  Previous
                </button>
                <span className="font-bold text-slate-900">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Selected Booking Details & Admin Notes (1 Col) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          {selectedBooking ? (
            <>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                  Selected Booking
                </span>
                <h3 className="text-lg font-bold font-mono text-slate-900">
                  {selectedBooking.booking_reference}
                </h3>
                <span className="text-xs text-slate-500">{selectedBooking.package_name}</span>
              </div>

              {/* Guest Details */}
              <div className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-400">Guest Name:</span>
                  <span className="font-bold text-slate-900">{selectedBooking.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date:</span>
                  <span className="font-semibold">{formatDate(selectedBooking.booking_date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Party:</span>
                  <span className="font-semibold">
                    {selectedBooking.adults} Adults, {selectedBooking.children} Children
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pickup Area:</span>
                  <span className="font-semibold text-right">{selectedBooking.pickup_location}</span>
                </div>
                {selectedBooking.hotel_name && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hotel/Apartment:</span>
                    <span className="font-semibold text-right">{selectedBooking.hotel_name}</span>
                  </div>
                )}
                {selectedBooking.special_requests && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-slate-400 block mb-0.5">Special Requests:</span>
                    <p className="bg-slate-50 p-2.5 rounded-lg text-slate-600 italic">
                      &ldquo;{selectedBooking.special_requests}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Quick WhatsApp & Call Actions */}
              <div className="flex items-center gap-2 pt-2">
                <a
                  href={createWhatsAppUrl(
                    selectedBooking.phone,
                    `Hello ${selectedBooking.customer_name}, this is Safari Dune following up on your booking request (${selectedBooking.booking_reference}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Guest</span>
                </a>

                <a
                  href={`tel:${selectedBooking.phone.replace(/[^0-9+]/g, "")}`}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 transition-colors"
                  title="Call Guest"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              {/* Internal Admin Notes */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <label className="block text-xs font-bold text-slate-900">
                  Internal Admin Notes
                </label>
                <span className="text-[10px] text-slate-400 block -mt-1">
                  Private to admin team (driver assignment, pricing discussions).
                </span>
                <textarea
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="e.g. Quoted AED 450 total. Assigned driver Bilal Land Cruiser #12."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    disabled={isSavingNote}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-amber-400 hover:bg-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    {isSavingNote ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )}
                    <span>Save Note</span>
                  </button>

                  {saveSuccess && (
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Note saved!</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Danger Zone: Delete Booking */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Danger Zone</span>
                <button
                  type="button"
                  onClick={() =>
                    handleDeleteBooking(
                      selectedBooking.id,
                      selectedBooking.booking_reference
                    )
                  }
                  disabled={deletingId === selectedBooking.id}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {deletingId === selectedBooking.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  <span>Delete Booking</span>
                </button>
              </div>
            </>
          ) : (
            <p className="text-xs text-slate-400 text-center py-8">
              Select a booking to view details.
            </p>
          )}
        </div>
      </div>

      {/* Delete Confirmation Popup Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Booking Record"
        itemName={deleteTarget?.reference}
        message={`Are you sure you want to permanently delete booking reference "${deleteTarget?.reference}"? This will remove it from the system.`}
        isLoading={!!deletingId}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
