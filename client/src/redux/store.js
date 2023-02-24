import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import categoriesReducer from "./slices/categoriesSlice";
import { productReducer } from "./slices/productSlice";
import { productsReducer } from "./slices/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    categories: categoriesReducer,
    product: productReducer,
    products: productsReducer,
  },
});

export default store;
