import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: {},
  loading: false,
  success: false,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateAddressRequest: (state) => {
      state.loading = true;
    },
    updateAddressSuccess: (state, action) => {
      state.loading = false;
      state.address = action.payload.address;
      state.success = action.payload.success;
    },
    updateAddressFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUpdateAddressError: (state) => {
      state.error = null;
    },
    resetUpdateAddress: (state) => {
      state.address = {};
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  updateAddressFail,
  updateAddressRequest,
  updateAddressSuccess,
  clearUpdateAddressError,
  resetUpdateAddress,
} = addressSlice.actions;

export const addressReducer = addressSlice.reducer;
