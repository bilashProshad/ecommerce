import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import categoriesReducer from "./slices/categoriesSlice";
import { productReducer } from "./slices/productSlice";
import { productsReducer } from "./slices/productSlice";
import { cartReducer } from "./slices/cartSlice";
import { profileReducer } from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    category: categoryReducer,
    categories: categoriesReducer,
    product: productReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
