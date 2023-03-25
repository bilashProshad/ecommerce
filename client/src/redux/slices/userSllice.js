import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: [],
    success: false,
    error: null,
  },
  reducers: {
    getAllUsersRequest: (state) => {
      state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.success = action.payload.success;
    },
    getAllUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllUsersError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getAllUsersFail,
  getAllUsersRequest,
  getAllUsersSuccess,
  clearAllUsersError,
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    user: {},
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    getUserDetailsRequest: (state) => {
      state.loading = true;
    },
    getUserDetailsSuccess: (state, action) => {
      state.user = action.payload.user;
      state.success = action.payload.success;
      state.loading = false;
    },
    getUserDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUserDetailsError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getUserDetailsFail,
  getUserDetailsRequest,
  getUserDetailsSuccess,
  clearUserDetailsError,
} = userDetailsSlice.actions;

export const userDetailsReducer = userDetailsSlice.reducer;

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isUpdated: false,
    isDeleted: false,
    error: null,
  },
  reducers: {
    updateUserRequest: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.isUpdated = action.payload.success;
      state.loading = false;
    },
    updateUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.isDeleted = action.payload.success;
      state.loading = false;
    },
    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUserError: (state) => {
      state.error = null;
    },
    resetUser: (state) => {
      state.error = null;
      state.isDeleted = false;
      state.isUpdated = false;
      state.loading = false;
    },
  },
});

export const {
  updateUserFail,
  updateUserRequest,
  updateUserSuccess,
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  clearUserError,
  resetUser,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
