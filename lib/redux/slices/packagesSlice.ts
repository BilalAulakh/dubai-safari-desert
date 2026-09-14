import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Package } from "@/types";
import { initialPackages } from "@/lib/data/packages";

export interface PackagesState {
  items: Package[];
  searchQuery: string;
  selectedDuration: string;
  sortBy: "featured" | "price-asc" | "price-desc" | "rating";
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PackagesState = {
  items: initialPackages,
  searchQuery: "",
  selectedDuration: "all",
  sortBy: "featured",
  status: "idle",
  error: null,
};

// Async Thunk with createAsyncThunk
export const fetchPackages = createAsyncThunk<
  Package[],
  void,
  { rejectValue: string }
>("packages/fetchPackages", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/admin/packages");
    if (!res.ok) {
      throw new Error("Failed to fetch packages from server");
    }
    const data = await res.json();
    return data.packages || data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch packages");
  }
});

export const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    setPackages: (state, action: PayloadAction<Package[]>) => {
      state.items = action.payload;
    },
    addPackage: (state, action: PayloadAction<Package>) => {
      state.items.unshift(action.payload);
    },
    updatePackage: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Package> }>
    ) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.updates,
        };
      }
    },
    deletePackage: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedDuration: (state, action: PayloadAction<string>) => {
      state.selectedDuration = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<"featured" | "price-asc" | "price-desc" | "rating">
    ) => {
      state.sortBy = action.payload;
    },
  },
  // builder with extraReducers for async thunks
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload && action.payload.length > 0) {
          state.items = action.payload;
        }
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to load packages";
      });
  },
});

export const {
  setPackages,
  addPackage,
  updatePackage,
  deletePackage,
  setSearchQuery,
  setSelectedDuration,
  setSortBy,
} = packagesSlice.actions;

export default packagesSlice.reducer;
