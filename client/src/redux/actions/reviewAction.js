import api from "../../http";
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

export const createReview =
  ({ id, rating, comment }) =>
  async (dispatch) => {
    try {
      dispatch(newReviewRequest());

      const { data } = await api.post(`/api/v1/products/${id}/review`, {
        rating,
        comment,
      });

      dispatch(newReviewSuccess({ ...data, isAdded: true }));
    } catch (error) {
      dispatch(newReviewFail(error.response.data.message));
    }
  };

export const myReview = (id) => async (dispatch) => {
  try {
    dispatch(newReviewRequest());

    const { data } = await api.get(`/api/v1/products/${id}/review`);

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

      const { data } = await api.put(
        `/api/v1/products/${productId}/review/${reviewId}`,
        { rating, comment }
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

      const { data } = await api.delete(
        `/api/v1/products/${productId}/review/${reviewId}`
      );

      dispatch(deleteReviewSuccess({ ...data, isDeleted: true }));
    } catch (error) {
      dispatch(deleteReviewFail(error.response.data.message));
    }
  };

export const getAllReview = (id) => async (dispatch) => {
  try {
    dispatch(getAllReviewRequest());

    const { data } = await api.get(`/api/v1/admin/products/${id}/reviews`);

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

      const { data } = await api.delete(
        `/api/v1/admin/products/${productId}/review/${reviewId}`
      );

      dispatch(deleteUserReviewSuccess(data));
    } catch (error) {
      dispatch(deleteUserReviewFail(error.response.data.message));
    }
  };
