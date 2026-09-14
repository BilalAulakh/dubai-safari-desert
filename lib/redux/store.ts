import { configureStore, combineReducers } from "@reduxjs/toolkit";
import packagesReducer from "./slices/packagesSlice";
import bookingsReducer from "./slices/bookingsSlice";
import reviewsReducer from "./slices/reviewsSlice";
import blogReducer from "./slices/blogSlice";
import activitiesReducer from "./slices/activitiesSlice";
import faqsReducer from "./slices/faqsSlice";
import galleryReducer from "./slices/gallerySlice";
import uiReducer from "./slices/uiSlice";

const rootReducer = combineReducers({
  packages: packagesReducer,
  bookings: bookingsReducer,
  reviews: reviewsReducer,
  blog: blogReducer,
  activities: activitiesReducer,
  faqs: faqsReducer,
  gallery: galleryReducer,
  ui: uiReducer,
});

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Infer types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
