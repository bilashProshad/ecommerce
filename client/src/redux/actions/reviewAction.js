import axios from "axios";
import {
  deleteReviewFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteUserReviewFail,
  deleteUserReviewRequest,
  deleteUserReviewSuccess,
  getAllReviewFail,
  getAllReviewRequest,
  getAllReviewSuccess,
  newReviewFail,
  newReviewRequest,
  newReviewSuccess,
  updateReviewFail,
  updateReviewRequest,
  updateReviewSuccess,
} from "../slices/reviewSlice";

// const server = process.env.REACT_APP_SERVER;
const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export const createReview =
  ({ id, rating, comment }) =>
  async (dispatch) => {
    try {
      dispatch(newReviewRequest());

      const { data } = await axios.post(
        `/api/v1/products/${id}/review`,
        { rating, comment },
        config
      );

      dispatch(newReviewSuccess({ ...data, isAdded: true }));
    } catch (error) {
      dispatch(newReviewFail(error.response.data.message));
    }
  };

export const myReview = (id) => async (dispatch) => {
  try {
    dispatch(newReviewRequest());

    const { data } = await axios.get(`/api/v1/products/${id}/review`, config);

    dispatch(newReviewSuccess(data));
  } catch (error) {
    dispatch(newReviewFail(error.response.data.message));
  }
};

export const updateReview =
  ({ productId, reviewId, rating, comment }) =>
  async (dispatch) => {
    try {
      dispatch(updateReviewRequest());

      const { data } = await axios.put(
        `/api/v1/products/${productId}/review/${reviewId}`,
        { rating, comment },
        config
      );

      dispatch(updateReviewSuccess({ ...data, isUpdated: true }));
    } catch (error) {
      dispatch(updateReviewFail(error.response.data.message));
    }
  };

export const deleteReview =
  ({ productId, reviewId }) =>
  async (dispatch) => {
    try {
      dispatch(deleteReviewRequest());

      const { data } = await axios.delete(
        `/api/v1/products/${productId}/review/${reviewId}`,
        config
      );

      dispatch(deleteReviewSuccess({ ...data, isDeleted: true }));
    } catch (error) {
      dispatch(deleteReviewFail(error.response.data.message));
    }
  };

export const getAllReview = (id) => async (dispatch) => {
  try {
    dispatch(getAllReviewRequest());

    const { data } = await axios.get(
      `/api/v1/admin/products/${id}/reviews`,
      config
    );

    dispatch(getAllReviewSuccess(data));
  } catch (error) {
    dispatch(getAllReviewFail(error.response.data.message));
  }
};

export const deleteUserReview =
  ({ productId, reviewId }) =>
  async (dispatch) => {
    try {
      dispatch(deleteUserReviewRequest());

      const { data } = await axios.delete(
        `/api/v1/admin/products/${productId}/review/${reviewId}`,
        config
      );

      dispatch(deleteUserReviewSuccess(data));
    } catch (error) {
      dispatch(deleteUserReviewFail(error.response.data.message));
    }
  };
