import { createSlice } from "@reduxjs/toolkit";

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    message: null,
    error: null,
    loading: false,
    success: false,
  },
  reducers: {
    forgotPasswordRequest: (state) => {
      state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    forgotPasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearForgotPasswordError: (state) => {
      state.error = null;
    },
    clearForgotPasswordMessage: (state) => {
      state.message = null;
    },
    // ------------------------------------
    resetPasswordRequest: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    },
    resetPasswordFailed: (state, action) => {
      state.error = action.payload;
    },
    clearResetPasswordError: (state) => {
      state.error = null;
    },
  },
});

export const {
  forgotPasswordFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  clearForgotPasswordError,
  clearForgotPasswordMessage,
  resetPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  clearResetPasswordError,
} = forgotPasswordSlice.actions;

export const forgotPasswordReducer = forgotPasswordSlice.reducer;
