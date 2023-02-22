import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: {},
  loading: false,
  error: null,
  success: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    createCategoryRequest: (state) => {
      state.loading = true;
    },
    createCategorySuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.category = action.payload.category;
    },
    createCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createCategoryReset: (state) => {
      state.category = {};
      state.success = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  createCategoryRequest,
  createCategorySuccess,
  createCategoryFail,
  createCategoryReset,
  clearError,
} = categorySlice.actions;

export default categorySlice.reducer;
