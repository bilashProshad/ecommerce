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
    productRequest: (state) => {
      state.loading = true;
    },
    productSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
      state.success = action.payload.success;
    },
    productFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearProductError: (state, action) => {
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
  productRequest,
  productSuccess,
  productFailed,
  clearProductError,
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
    allProductRequest: (state) => {
      state.loading = true;
    },
    allProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.success = action.payload.success;
    },
    allProductFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllProductError: (state) => {
      state.error = null;
    },
    // ---------------------------------------------
    adminProductsRequest: (state) => {
      state.loading = true;
    },
    adminProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.success = action.payload.success;
    },
    adminProductsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAdminProductsError: (state) => {
      state.error = null;
    },
  },
});

export const {
  allProductRequest,
  allProductSuccess,
  allProductFailed,
  clearAllProductError,
  adminProductsRequest,
  adminProductsSuccess,
  adminProductsFailed,
  clearAdminProductsError,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;

const productModifySlice = createSlice({
  name: "productModify",
  initialState: {
    product: {},
    loading: false,
    success: false,
    error: null,
    message: null,
  },
  reducers: {
    updateProductRequest: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
      state.success = action.payload.success;
    },
    updateProductFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductRequest: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.success = action.payload.success;
    },
    deleteProductFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearDeleteProductMessage: (state) => {
      state.message = null;
    },
    clearModifiedProductError: (state) => {
      state.error = null;
    },
    resetProductModified: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.product = {};
      state.success = false;
    },
  },
});

export const {
  updateProductFailed,
  updateProductRequest,
  updateProductSuccess,
  clearModifiedProductError,
  clearDeleteProductMessage,
  deleteProductFailed,
  deleteProductRequest,
  deleteProductSuccess,
  resetProductModified,
} = productModifySlice.actions;

export const productModifyReducer = productModifySlice.reducer;
