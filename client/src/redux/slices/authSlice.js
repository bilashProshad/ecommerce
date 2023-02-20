import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuth: false,
  loading: false,
  error: null,
  message: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.user = null;
      state.message = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFail,
  loginRequest,
  loginSuccess,
  loginFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutRequest,
  logoutSuccess,
  clearError,
  clearMessage,
} = authSlice.actions;

export default authSlice.reducer;
