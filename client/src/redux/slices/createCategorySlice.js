import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: {},
  loading: false,
  error: null,
  success: false,
};

export const createCategorySlice = createSlice({
  name: "createCategory",
  initialState,
  reducers: {
    categoryUploadRequest: (state) => {
      state.loading = true;
    },
    categoryUploadSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.category = action.payload.category;
    },
    categoryUploadFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    clearError: (state) => {
      state.error = null;
    },
    categoryUploadReset: (state) => {},
  },
});
