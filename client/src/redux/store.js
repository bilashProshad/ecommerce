import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
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

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer,
    address: addressReducer,
    category: categoryReducer,
    categories: categoriesReducer,
    product: productReducer,
    products: productsReducer,
    productModify: productModifyReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrderReducer,
    forgotPassword: forgotPasswordReducer,
    orders: ordersReducer,
    myOrderDetails: myOrderDetailsReducer,
  },
});

export default store;
