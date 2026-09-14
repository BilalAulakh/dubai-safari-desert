import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Booking, BookingStatus } from "@/types";
import { BookingFormData } from "@/lib/validations/booking";

export interface BookingsState {
  items: Booking[];
  activeBookingDraft: Partial<Booking>;
  lastSubmittedBooking: Booking | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchQuery: string;
  statusFilter: BookingStatus | "all";
}

const fallbackBookings: Booking[] = [
  {
    id: "booking-demo-1",
    booking_reference: "DSD-2026-DXB81",
    package_id: "pkg-evening-safari",
    package_name: "Evening Desert Safari with BBQ Dinner",
    customer_name: "Alexander Wright",
    phone: "+971 52 987 6543",
    email: "alex.wright@example.com",
    booking_date: "2026-09-12",
    adults: 2,
    children: 1,
    pickup_location: "Downtown Dubai (Burj Khalifa area)",
    hotel_name: "Address Downtown",
    special_requests: "Vegetarian meal for 1 adult, baby seat for 1 child.",
    status: "pending",
    admin_notes:
      "Followed up on WhatsApp, waiting for customer to confirm pickup time.",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "booking-demo-2",
    booking_reference: "DSD-2026-VIP44",
    package_id: "pkg-private-safari",
    package_name: "VIP Private Desert Safari Experience",
    customer_name: "Nadia Al-Hassan",
    phone: "+971 50 888 1234",
    email: "nadia.hassan@example.com",
    booking_date: "2026-09-15",
    adults: 4,
    children: 0,
    pickup_location: "Palm Jumeirah & Madinat Jumeirah",
    hotel_name: "Atlantis The Royal",
    special_requests: "Anniversary celebration table at camp.",
    status: "confirmed",
    admin_notes: "Private Land Cruiser allocated. Driver Rashid assigned.",
    created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
];

const initialState: BookingsState = {
  items: fallbackBookings,
  activeBookingDraft: {
    adults: 2,
    children: 0,
    pickup_location: "Deira / Bur Dubai",
  },
  lastSubmittedBooking: null,
  status: "idle",
  error: null,
  searchQuery: "",
  statusFilter: "all",
};

// Async Thunk: Submit new booking via API
export const submitBookingRequest = createAsyncThunk<
  { booking: Booking; bookingReference: string },
  BookingFormData,
  { rejectValue: string }
>("bookings/submitBookingRequest", async (formData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || "Failed to submit booking request");
    }
    const newBooking: Booking = result.booking || {
      id: `bkg-${Date.now()}`,
      booking_reference: result.bookingReference,
      package_id: formData.package_id,
      customer_name: formData.customer_name,
      phone: formData.phone,
      email: formData.email,
      booking_date: formData.booking_date,
      adults: formData.adults,
      children: formData.children,
      pickup_location: formData.pickup_location,
      hotel_name: formData.hotel_name,
      special_requests: formData.special_requests,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    return { booking: newBooking, bookingReference: result.bookingReference };
  } catch (err: any) {
    return rejectWithValue(err.message || "An unexpected error occurred");
  }
});

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.items = action.payload;
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.items.unshift(action.payload);
      state.lastSubmittedBooking = action.payload;
    },
    updateBookingStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: BookingStatus;
        adminNotes?: string;
      }>
    ) => {
      const booking = state.items.find((b) => b.id === action.payload.id);
      if (booking) {
        booking.status = action.payload.status;
        if (action.payload.adminNotes !== undefined) {
          booking.admin_notes = action.payload.adminNotes;
        }
        booking.updated_at = new Date().toISOString();
      }
    },
    setBookingDraft: (state, action: PayloadAction<Partial<Booking>>) => {
      state.activeBookingDraft = {
        ...state.activeBookingDraft,
        ...action.payload,
      };
    },
    clearBookingDraft: (state) => {
      state.activeBookingDraft = {
        adults: 2,
        children: 0,
        pickup_location: "Deira / Bur Dubai",
      };
    },
    setLastSubmittedBooking: (state, action: PayloadAction<Booking | null>) => {
      state.lastSubmittedBooking = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (
      state,
      action: PayloadAction<BookingStatus | "all">
    ) => {
      state.statusFilter = action.payload;
    },
  },
  // builder with extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(submitBookingRequest.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitBookingRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload.booking);
        state.lastSubmittedBooking = action.payload.booking;
      })
      .addCase(submitBookingRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to submit booking";
      });
  },
});

export const {
  setBookings,
  addBooking,
  updateBookingStatus,
  setBookingDraft,
  clearBookingDraft,
  setLastSubmittedBooking,
  setSearchQuery,
  setStatusFilter,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
