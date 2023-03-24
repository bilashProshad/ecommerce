import { createSlice } from "@reduxjs/toolkit";

const newOrderSlice = createSlice({
  name: "newOrder",
  initialState: {
    order: {},
    loading: false,
    error: null,
    success: false,
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
    resetCreateOrder: (state) => {
      state.error = null;
      state.success = false;
      state.order = {};
      state.loading = false;
    },
  },
});

export const {
  createOrderFailed,
  clearCreateOrderError,
  createOrderRequest,
  createOrderSuccess,
  resetCreateOrder,
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

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    order: {},
    success: false,
    loading: false,
    error: null,
  },
  reducers: {
    getOrderDetailsRequest: (state) => {
      state.loading = true;
    },
    getOrderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload.order;
      state.success = action.payload.success;
    },
    getOrderDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearOrderDetailsError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getOrderDetailsRequest,
  getOrderDetailsSuccess,
  getOrderDetailsFail,
  clearOrderDetailsError,
} = orderDetailsSlice.actions;

export const orderDetailsReducer = orderDetailsSlice.reducer;

const orderSlice = createSlice({
  name: "order",
  initialState: {
    success: false,
    loading: false,
    error: null,
  },
  reducers: {
    updateOrderRequest: (state) => {
      state.loading = true;
    },
    updateOrderSuccess: (state, action) => {
      state.success = action.payload.success;
      state.loading = false;
    },
    updateOrderFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUpdateOrderError: (state) => {
      state.error = null;
    },
    resetUpdateOrder: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
    },
    deleteOrderRequest: (state) => {
      state.loading = true;
    },
    deleteOrderSuccess: (state, action) => {
      state.success = action.payload.success;
      state.loading = false;
    },
    deleteOrderFail: (state, action) => {
      state.error = action.payload;
    },
    clearDeleteOrderError: (state) => {
      state.error = null;
    },
    resetDeleteOrderError: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  clearUpdateOrderError,
  resetUpdateOrder,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFail,
  clearDeleteOrderError,
  resetDeleteOrderError,
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
