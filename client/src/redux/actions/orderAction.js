import axios from "axios";
import {
  createOrderFailed,
  createOrderRequest,
  createOrderSuccess,
  myOrdersFailed,
  myOrdersRequest,
  myOrdersSuccess,
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
