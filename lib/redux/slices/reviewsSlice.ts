import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Review, ReviewStatus } from "@/types";
import { initialReviews } from "@/lib/data/reviews";
import { ReviewFormData } from "@/lib/validations/review";
import api from "@/lib/axios";

export interface ReviewsState {
  items: Review[];
  statusFilter: ReviewStatus | "all";
  ratingFilter: number | 0;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReviewsState = {
  items: initialReviews,
  statusFilter: "all",
  ratingFilter: 0,
  status: "idle",
  error: null,
};

// Async Thunk: Submit review via API
export const submitReview = createAsyncThunk<
  Review,
  ReviewFormData,
  { rejectValue: string }
>("reviews/submitReview", async (formData, { rejectWithValue }) => {
  try {
    const { data: json } = await api.post("/api/reviews", formData);
    if (!json.success) {
      throw new Error(json.message || "Failed to submit review");
    }
    const newReview: Review = json.review || {
      id: `rev-${Date.now()}`,
      customer_name: formData.customer_name,
      country: formData.country,
      email: formData.email,
      rating: formData.rating,
      comment: formData.comment,
      status: "pending",
      featured: false,
      created_at: new Date().toISOString(),
    };
    return newReview;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || "Failed to submit review"
    );
  }
});

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.items = action.payload;
    },
    addReview: (state, action: PayloadAction<Review>) => {
      state.items.unshift(action.payload);
    },
    updateReviewStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: ReviewStatus;
        featured?: boolean;
      }>
    ) => {
      const review = state.items.find((r) => r.id === action.payload.id);
      if (review) {
        review.status = action.payload.status;
        if (action.payload.featured !== undefined) {
          review.featured = action.payload.featured;
        }
      }
    },
    deleteReview: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((r) => r.id !== action.payload);
    },
    setStatusFilter: (
      state,
      action: PayloadAction<ReviewStatus | "all">
    ) => {
      state.statusFilter = action.payload;
    },
    setRatingFilter: (state, action: PayloadAction<number>) => {
      state.ratingFilter = action.payload;
    },
  },
  // builder with extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(submitReview.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to submit review";
      });
  },
});

export const {
  setReviews,
  addReview,
  updateReviewStatus,
  deleteReview,
  setStatusFilter,
  setRatingFilter,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
