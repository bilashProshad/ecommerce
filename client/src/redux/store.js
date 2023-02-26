import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import categoriesReducer from "./slices/categoriesSlice";
import { productReducer } from "./slices/productSlice";
import { productsReducer } from "./slices/productSlice";
import { cartReducer } from "./slices/cartSlice";
import { userReducer } from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    categories: categoriesReducer,
    product: productReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
