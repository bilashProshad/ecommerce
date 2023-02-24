import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
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
      state.categories = action.payload;
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
