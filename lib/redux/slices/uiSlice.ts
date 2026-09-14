import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SupportedCurrency = "AED" | "USD" | "EUR" | "GBP" | "SAR";

export interface UIState {
  currency: SupportedCurrency;
  exchangeRates: Record<SupportedCurrency, number>;
  mobileMenuOpen: boolean;
  searchModalOpen: boolean;
  bookingModalOpen: boolean;
  selectedPackageForModal: string | null;
  toast: {
    message: string;
    type: "success" | "error" | "info";
    id: number;
  } | null;
}

const initialState: UIState = {
  currency: "AED",
  exchangeRates: {
    AED: 1,
    USD: 0.272,
    EUR: 0.252,
    GBP: 0.216,
    SAR: 1.02,
  },
  mobileMenuOpen: false,
  searchModalOpen: false,
  bookingModalOpen: false,
  selectedPackageForModal: null,
  toast: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<SupportedCurrency>) => {
      state.currency = action.payload;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setSearchModalOpen: (state, action: PayloadAction<boolean>) => {
      state.searchModalOpen = action.payload;
    },
    openBookingModal: (
      state,
      action: PayloadAction<{ packageId?: string } | undefined>
    ) => {
      state.bookingModalOpen = true;
      state.selectedPackageForModal = action.payload?.packageId || null;
    },
    closeBookingModal: (state) => {
      state.bookingModalOpen = false;
      state.selectedPackageForModal = null;
    },
    showToast: (
      state,
      action: PayloadAction<{ message: string; type: "success" | "error" | "info" }>
    ) => {
      state.toast = {
        ...action.payload,
        id: Date.now(),
      };
    },
    clearToast: (state) => {
      state.toast = null;
    },
  },
});

export const {
  setCurrency,
  setMobileMenuOpen,
  toggleMobileMenu,
  setSearchModalOpen,
  openBookingModal,
  closeBookingModal,
  showToast,
  clearToast,
} = uiSlice.actions;

export default uiSlice.reducer;
