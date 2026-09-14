import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GalleryItem } from "@/types";
import { initialGalleryItems } from "@/lib/data/gallery";

export interface GalleryState {
  items: GalleryItem[];
  activeCategory: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: GalleryState = {
  items: initialGalleryItems,
  activeCategory: "all",
  status: "idle",
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setGalleryItems: (state, action: PayloadAction<GalleryItem[]>) => {
      state.items = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setGalleryItems, setActiveCategory } = gallerySlice.actions;

export default gallerySlice.reducer;
