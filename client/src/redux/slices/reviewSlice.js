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

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    getAllReviewRequest: (state) => {
      state.loading = true;
    },
    getAllReviewSuccess: (state, action) => {
      state.reviews = action.payload.reviews;
      state.success = action.payload.success;
      state.loading = false;
    },
    getAllReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllReviewError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getAllReviewFail,
  getAllReviewRequest,
  getAllReviewSuccess,
  clearAllReviewError,
} = reviewsSlice.actions;

export const reviewsReducer = reviewsSlice.reducer;

const reviewModifySlice = createSlice({
  name: "reviewModify",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    deleteUserReviewRequest: (state) => {
      state.loading = true;
    },
    deleteUserReviewSuccess: (state, action) => {
      state.success = action.payload.success;
      state.loading = false;
    },
    deleteUserReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearDeleteUserReviewError: (state) => {
      state.error = null;
    },
    resetDeleteUserReview: (state) => {
      state.error = null;
      state.loading = false;
      state.success = false;
    },
  },
});

export const {
  deleteUserReviewFail,
  deleteUserReviewRequest,
  deleteUserReviewSuccess,
  clearDeleteUserReviewError,
  resetDeleteUserReview,
} = reviewModifySlice.actions;

export const reviewModifyReducer = reviewModifySlice.reducer;
