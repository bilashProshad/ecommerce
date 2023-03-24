import axios from "axios";
import {
  newReviewFail,
  newReviewRequest,
  newReviewSuccess,
  updateReviewFail,
  updateReviewRequest,
  updateReviewSuccess,
} from "../slices/reviewSlice";

const server = process.env.REACT_APP_SERVER;
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
        `${server}/api/v1/products/${id}/review`,
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

    const { data } = await axios.get(
      `${server}/api/v1/products/${id}/review`,
      config
    );

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
        `${server}/api/v1/products/${productId}/review/${reviewId}`,
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
      dispatch(updateReviewRequest());

      const { data } = await axios.delete(
        `${server}/api/v1/products/${productId}/review/${reviewId}`,
        config
      );

      dispatch(updateReviewSuccess({ ...data, isUpdated: true }));
    } catch (error) {
      dispatch(updateReviewFail(error.response.data.message));
    }
  };
