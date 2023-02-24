import axios from "axios";
import {
  createProductRequest,
  createProductSuccess,
  createProductFailed,
  getAllProductRequest,
  getAllProductSuccess,
  getAllProductFailed,
  getProductRequest,
  getProductSuccess,
  getProductFailed,
} from "../slices/productSlice";

const server = process.env.REACT_APP_SERVER;

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch(createProductRequest());

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/api/v1/admin/products`,
      productData,
      config
    );

    dispatch(createProductSuccess(data));
  } catch (error) {
    dispatch(createProductFailed(error.response.data.message));
  }
};

export const getAllProduct = (query) => async (dispatch) => {
  try {
    dispatch(getAllProductRequest());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    let url = `${server}/api/v1/products`;

    if (query) {
      url = `${server}/api/v1/products?${query}`;
    }

    const { data } = await axios.get(url, config);

    dispatch(getAllProductSuccess(data));
  } catch (error) {
    dispatch(getAllProductFailed(error.response.data.message));
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(getProductRequest());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.get(`${server}/api/v1/products/${id}`, config);

    dispatch(getProductSuccess(data));
  } catch (error) {
    dispatch(getProductFailed(error.response.data.message));
  }
};
