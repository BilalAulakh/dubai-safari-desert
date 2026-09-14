import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FAQ } from "@/types";
import { initialFAQs } from "@/lib/data/faqs";

export interface FAQsState {
  items: FAQ[];
  activeCategory: string;
  searchQuery: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: FAQsState = {
  items: initialFAQs,
  activeCategory: "all",
  searchQuery: "",
  status: "idle",
};

export const faqsSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {
    setFAQs: (state, action: PayloadAction<FAQ[]>) => {
      state.items = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setFAQs, setActiveCategory, setSearchQuery } = faqsSlice.actions;

export default faqsSlice.reducer;
