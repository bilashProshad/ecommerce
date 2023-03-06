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
