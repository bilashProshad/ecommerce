import { createSlice } from "@reduxjs/toolkit";

const newOrderSlice = createSlice({
  name: "newOrder",
  initialState: {
    order: {},
    loading: false,
    error: null,
    success: true,
  },
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

const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState: {
    orders: [],
    loading: false,
    success: true,
    error: null,
  },
  reducers: {
    myOrdersRequest: (state) => {
      state.loading = true;
    },
    myOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      state.success = action.payload.success;
    },
    myOrdersFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearMyOrdersError: (state) => {
      state.error = null;
    },
  },
});

export const {
  myOrdersFailed,
  myOrdersRequest,
  myOrdersSuccess,
  clearMyOrdersError,
} = myOrdersSlice.actions;

export const myOrderReducer = myOrdersSlice.reducer;

const orders = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    orders: [],
    error: null,
  },
  reducers: {
    getAllOrdersRequest: (state) => {
      state.loading = true;
    },
    getAllOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    },
    getAllOrdersFail: (state, action) => {
      state.error = action.payload;
    },
    clearGetAllOrdersError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getAllOrdersFail,
  getAllOrdersRequest,
  getAllOrdersSuccess,
  clearGetAllOrdersError,
} = orders.actions;

export const ordersReducer = orders.reducer;
