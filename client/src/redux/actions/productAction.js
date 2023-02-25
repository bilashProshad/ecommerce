import axios from "axios";
import {
  createProductRequest,
  createProductSuccess,
  createProductFailed,
  allProductRequest,
  allProductSuccess,
  allProductFailed,
  productRequest,
  productSuccess,
  productFailed,
  adminProductsRequest,
  adminProductsSuccess,
  adminProductsFailed,
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
    dispatch(allProductRequest());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    let url = `${server}/api/v1/products`;

    if (query) {
      url = `${server}/api/v1/products?${query}`;
    }

    const { data } = await axios.get(url, config);

    dispatch(allProductSuccess(data));
  } catch (error) {
    dispatch(allProductFailed(error.response.data.message));
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productRequest());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.get(`${server}/api/v1/products/${id}`, config);

    dispatch(productSuccess(data));
  } catch (error) {
    dispatch(productFailed(error.response.data.message));
  }
};

export const getAdminProducts = (query) => async (dispatch) => {
  try {
    dispatch(adminProductsRequest());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    let url = `${server}/api/v1/admin/products`;

    if (query) {
      url = `${server}/api/v1/admin/products?${query}`;
    }

    const { data } = await axios.get(url, config);

    dispatch(adminProductsSuccess(data));
  } catch (error) {
    dispatch(adminProductsFailed(error.response.data.message));
  }
};
