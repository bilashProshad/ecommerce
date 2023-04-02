import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  totalCategories: 0,
  loading: false,
  error: null,
  success: false,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getCategoriesRequest: (state) => {
      state.loading = true;
    },
    getCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload.categories;
      state.totalCategories = action.payload.totalCategories;
    },
    getCategoriesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCategoriesError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getCategoriesFail,
  getCategoriesRequest,
  getCategoriesSuccess,
  clearCategoriesError,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
