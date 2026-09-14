import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Activity } from "@/types";
import { initialActivities } from "@/lib/data/activities";

export interface ActivitiesState {
  items: Activity[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ActivitiesState = {
  items: initialActivities,
  status: "idle",
};

export const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<Activity[]>) => {
      state.items = action.payload;
    },
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.items.push(action.payload);
    },
    updateActivity: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Activity> }>
    ) => {
      const index = state.items.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.updates,
        };
      }
    },
    deleteActivity: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((a) => a.id !== action.payload);
    },
  },
});

export const {
  setActivities,
  addActivity,
  updateActivity,
  deleteActivity,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
