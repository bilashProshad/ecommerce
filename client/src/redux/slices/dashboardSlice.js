import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
  stats: {},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getDashboardStatsRequest: (state) => {
      state.loading = true;
    },
    getDashboardStatsSuccess: (state, action) => {
      state.stats = action.payload.stats;
      state.success = action.payload.success;
      state.loading = false;
    },
    getDashboardStatsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearGetDashboardStatsError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getDashboardStatsFail,
  getDashboardStatsRequest,
  getDashboardStatsSuccess,
  clearGetDashboardStatsError,
} = dashboardSlice.actions;

export const dashboardReducer = dashboardSlice.reducer;
