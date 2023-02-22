import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import createCategoryReducer from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: createCategoryReducer,
  },
});

export default store;
