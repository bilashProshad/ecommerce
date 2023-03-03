import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import categoriesReducer from "./slices/categoriesSlice";
import { productReducer } from "./slices/productSlice";
import { productsReducer } from "./slices/productSlice";
import { cartReducer } from "./slices/cartSlice";
import { profileReducer } from "./slices/profileSlice";
import { productModifyReducer } from "./slices/productSlice";
import { addressReducer } from "./slices/addressSlice";
import { newOrderReducer } from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    address: addressReducer,
    category: categoryReducer,
    categories: categoriesReducer,
    product: productReducer,
    products: productsReducer,
    productModify: productModifyReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
  },
});

export default store;
