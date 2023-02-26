import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updatePasswordRequest: (state) => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.success = action.payload.success;
    },
    updatePasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUpdatePasswordError: (state, action) => {
      state.error = null;
    },
    updatePasswordReset: (state) => {
      state.user = {};
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  updatePasswordFailed,
  updatePasswordRequest,
  updatePasswordReset,
  updatePasswordSuccess,
  clearUpdatePasswordError,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
