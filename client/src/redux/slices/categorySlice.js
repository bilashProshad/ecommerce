import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: {},
  loading: false,
  error: null,
  success: false,
};

export const newCategorySlice = createSlice({
  name: "newCategory",
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
} = newCategorySlice.actions;

export const newCategoryReducer = newCategorySlice.reducer;

const categoryDetailsSlice = createSlice({
  name: "categoryDetails",
  initialState: {
    category: {},
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    categoryDetailsRequest: (state) => {
      state.loading = true;
    },
    categoryDetailsSuccess: (state, action) => {
      state.category = action.payload.category;
      state.success = action.payload.success;
      state.loading = false;
    },
    categoryDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCategoryDetailsError: (state) => {
      state.error = null;
    },
  },
});

export const {
  categoryDetailsFail,
  categoryDetailsRequest,
  categoryDetailsSuccess,
  clearCategoryDetailsError,
} = categoryDetailsSlice.actions;

export const categoryDetailsReducer = categoryDetailsSlice.reducer;

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    error: null,
    success: false,
    message: null,
  },
  reducers: {
    updateCategoryRequest: (state) => {
      state.loading = true;
    },
    updateCategorySuccess: (state, action) => {
      state.success = action.payload.success;
      state.loading = false;
    },
    updateCategoryFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUpdateCategoryError: (state) => {
      state.error = null;
    },
    resetUpdateCategory: (state) => {
      state.success = false;
    },
    deleteCategoryRequest: (state) => {
      state.loading = true;
    },
    deleteCategorySuccess: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.loading = false;
    },
    deleteCategoryFail: (state, action) => {
      state.error = action.payload;
    },
    clearDeleteCategoryError: (state) => {
      state.error = null;
    },
    clearDeleteCategoryMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  updateCategoryFail,
  updateCategoryRequest,
  updateCategorySuccess,
  clearUpdateCategoryError,
  resetUpdateCategory,
  deleteCategoryFail,
  deleteCategoryRequest,
  deleteCategorySuccess,
  clearDeleteCategoryError,
  clearDeleteCategoryMessage,
} = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
