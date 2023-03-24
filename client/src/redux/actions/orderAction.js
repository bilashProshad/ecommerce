import axios from "axios";
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

const server = process.env.REACT_APP_SERVER;

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/api/v1/orders/new`,
      order,
      config
    );

    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFailed(error.response.data.message));
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch(myOrdersRequest());

    const { data } = await axios.get(`${server}/api/v1/orders/me`, {
      withCredentials: true,
    });

    dispatch(myOrdersSuccess(data));
  } catch (error) {
    dispatch(myOrdersFailed(error.response.data.message));
  }
};

export const getSingleOrder = (id) => async (dispatch) => {
  try {
    dispatch(getOrderDetailsRequest());

    const { data } = await axios.get(`${server}/api/v1/orders/${id}`, {
      withCredentials: true,
    });

    dispatch(getOrderDetailsSuccess(data));
  } catch (error) {
    dispatch(getOrderDetailsFail(error.response.data.message));
  }
};

// ==================================================================
// Admin
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch(getAllOrdersRequest());

    const { data } = await axios.get(`${server}/api/v1/admin/orders`, {
      withCredentials: true,
    });

    dispatch(getAllOrdersSuccess(data));
  } catch (error) {
    dispatch(getAllOrdersFail(error.response.data.message));
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(getOrderDetailsRequest());

    const { data } = await axios.get(`${server}/api/v1/admin/orders/${id}`, {
      withCredentials: true,
    });

    dispatch(getOrderDetailsSuccess(data));
  } catch (error) {
    dispatch(getOrderDetailsFail(error.response.data.message));
  }
};

export const updateOrder = (id, order) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    dispatch(updateOrderRequest());

    const { data } = await axios.put(
      `${server}/api/v1/admin/orders/${id}`,
      order,
      config
    );

    dispatch(updateOrderSuccess(data));
  } catch (error) {
    dispatch(updateOrderFail(error.response.data.message));
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());

    const { data } = await axios.delete(`${server}/api/v1/admin/orders/${id}`, {
      withCredentials: true,
    });

    dispatch(deleteOrderSuccess(data));
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message));
  }
};
