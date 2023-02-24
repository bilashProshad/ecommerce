import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  loading: false,
  success: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    createProductRequest: (state) => {
      state.loading = true;
    },
    createProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
      state.success = action.payload.success;
    },
    createProductFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProductReset: (state) => {
      state.product = {};
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    clearCreateProductError: (state, action) => {
      state.error = null;
    },
    // --------------------------------------------
    getProductRequest: (state) => {
      state.loading = true;
    },
    getProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
      state.success = action.payload.success;
    },
    getProductFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearGetProductError: (state, action) => {
      state.error = null;
    },
  },
});

export const {
  createProductReset,
  createProductFailed,
  createProductRequest,
  createProductSuccess,
  clearCreateProductError,
  getProductRequest,
  getProductSuccess,
  getProductFailed,
  clearGetProductError,
} = productSlice.actions;

export const productReducer = productSlice.reducer;

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    getAllProductRequest: (state) => {
      state.loading = true;
    },
    getAllProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.success = action.payload.success;
    },
    getAllProductFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearGetAllProductError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getAllProductRequest,
  getAllProductSuccess,
  getAllProductFailed,
  clearGetAllProductError,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
