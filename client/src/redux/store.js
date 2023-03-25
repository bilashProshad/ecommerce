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
  orderDetailsReducer,
  orderReducer,
} from "./slices/orderSlice";
import { forgotPasswordReducer } from "./slices/passwordSlice";
import {
  userDetailsReducer,
  userReducer,
  usersReducer,
} from "./slices/userSllice";
import { dashboardReducer } from "./slices/dashboardSlice";
import { reviewReducer } from "./slices/reviewSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer,
    user: userReducer,
    userDetails: userDetailsReducer,
    address: addressReducer,
    forgotPassword: forgotPasswordReducer,
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
    order: orderReducer,
    orders: ordersReducer,
    orderDetails: orderDetailsReducer,
    dashboard: dashboardReducer,
    review: reviewReducer,
  },
});

export default store;
