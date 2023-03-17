import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import {
  newCategoryReducer,
  categoryReducer,
  categoryDetailsReducer,
} from "./slices/categorySlice";
import categoriesReducer from "./slices/categoriesSlice";
import {
  productReducer,
  productsReducer,
  productModifyReducer,
} from "./slices/productSlice";
import { cartReducer } from "./slices/cartSlice";
import { profileReducer } from "./slices/profileSlice";
import { addressReducer } from "./slices/addressSlice";
import {
  newOrderReducer,
  myOrderReducer,
  ordersReducer,
  myOrderDetailsReducer,
} from "./slices/orderSlice";
import { forgotPasswordReducer } from "./slices/passwordSlice";
import { usersReducer } from "./slices/userSllice";
import { dashboardReducer } from "./slices/dashboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer,
    address: addressReducer,
    newCategory: newCategoryReducer,
    categories: categoriesReducer,
    category: categoryReducer,
    categoryDetails: categoryDetailsReducer,
    product: productReducer,
    products: productsReducer,
    productModify: productModifyReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrderReducer,
    forgotPassword: forgotPasswordReducer,
    orders: ordersReducer,
    myOrderDetails: myOrderDetailsReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
