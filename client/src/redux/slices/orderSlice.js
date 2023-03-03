import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {},
  loading: false,
  error: null,
  success: true,
};

const newOrderSlice = createSlice({
  name: "newOrder",
  initialState,
  reducers: {
    createOrderRequest: (state) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload.order;
      state.success = action.payload.success;
    },
    createOrderFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCreateOrderError: (state) => {
      state.error = null;
    },
  },
});

export const {
  createOrderFailed,
  clearCreateOrderError,
  createOrderRequest,
  createOrderSuccess,
} = newOrderSlice.actions;

export const newOrderReducer = newOrderSlice.reducer;
