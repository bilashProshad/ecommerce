import api from "../../http";
import {
  createOrderFailed,
  createOrderRequest,
  createOrderSuccess,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  getAllOrdersFail,
  getAllOrdersRequest,
  getAllOrdersSuccess,
  getOrderDetailsFail,
  getOrderDetailsRequest,
  getOrderDetailsSuccess,
  myOrdersFailed,
  myOrdersRequest,
  myOrdersSuccess,
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
} from "../slices/orderSlice";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());

    const { data } = await api.post(`/api/v1/orders/new`, order);

    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFailed(error.response.data.message));
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch(myOrdersRequest());

    const { data } = await api.get(`/api/v1/orders/me`);

    dispatch(myOrdersSuccess(data));
  } catch (error) {
    dispatch(myOrdersFailed(error.response.data.message));
  }
};

export const getSingleOrder = (id) => async (dispatch) => {
  try {
    dispatch(getOrderDetailsRequest());

    const { data } = await api.get(`/api/v1/orders/${id}`);

    dispatch(getOrderDetailsSuccess(data));
  } catch (error) {
    dispatch(getOrderDetailsFail(error.response.data.message));
  }
};

// ==================================================================
// Admin
export const getAllOrders = (query) => async (dispatch) => {
  try {
    dispatch(getAllOrdersRequest());

    let url = `/api/v1/admin/orders`;
    if (query) {
      url = `/api/v1/admin/orders?${query}`;
    }

    const { data } = await api.get(url);

    dispatch(getAllOrdersSuccess(data));
  } catch (error) {
    dispatch(getAllOrdersFail(error.response.data.message));
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(getOrderDetailsRequest());

    const { data } = await api.get(`/api/v1/admin/orders/${id}`);

    dispatch(getOrderDetailsSuccess(data));
  } catch (error) {
    dispatch(getOrderDetailsFail(error.response.data.message));
  }
};

export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());

    const { data } = await api.put(`/api/v1/admin/orders/${id}`, order);

    dispatch(updateOrderSuccess(data));
  } catch (error) {
    dispatch(updateOrderFail(error.response.data.message));
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());

    const { data } = await api.delete(`/api/v1/admin/orders/${id}`);

    dispatch(deleteOrderSuccess(data));
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message));
  }
};
