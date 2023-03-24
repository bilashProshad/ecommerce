import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    review: {},
    loading: false,
    success: false,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
    loadingUpdate: false,
    error: null,
  },
  reducers: {
    newReviewRequest: (state) => {
      state.loading = true;
    },
    newReviewSuccess: (state, action) => {
      state.review = action.payload.review;
      state.loading = false;
      state.isAdded = action.payload.isAdded;
      state.success = action.payload.success;
    },
    newReviewFail: (state, action) => {
      state.error = action.payload;
    },
    updateReviewRequest: (state) => {
      state.loadingUpdate = true;
    },
    updateReviewSuccess: (state, action) => {
      state.review = action.payload.review;
      state.loadingUpdate = false;
      state.isUpdated = action.payload.isUpdated;
    },
    updateReviewFail: (state, action) => {
      state.loadingUpdate = false;
      state.error = action.payload;
    },
    deleteReviewRequest: (state) => {
      state.loadingUpdate = true;
    },
    deleteReviewSuccess: (state, action) => {
      state.review = action.payload.review;
      state.loadingUpdate = false;
      state.isDeleted = action.payload.isDeleted;
    },
    deleteReviewFail: (state, action) => {
      state.loadingUpdate = false;
      state.error = action.payload;
    },
    clearNewReviewError: (state) => {
      state.error = null;
    },
    resetReviewSuccess: (state) => {
      state.isAdded = false;
      state.success = false;
      state.isUpdated = false;
      state.isDeleted = false;
    },
  },
});

export const {
  newReviewFail,
  newReviewRequest,
  newReviewSuccess,
  clearNewReviewError,
  resetReviewSuccess,
  updateReviewRequest,
  updateReviewSuccess,
  updateReviewFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
} = reviewSlice.actions;

export const reviewReducer = reviewSlice.reducer;
