import { createSlice } from "@reduxjs/toolkit";

const cartItems = JSON.parse(localStorage.getItem("obCartItem"));

const initialState = {
  items: cartItems ? cartItems.items : [],
  totalQuantity: cartItems ? cartItems.totalQuantity : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload.item;
      const existingItem = state.items.find((item) => item._id === newItem._id);
      state.totalQuantity += action.payload.quantity;
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: action.payload.quantity,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemToCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item._id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item._id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    removeWholeItemToCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item._id === id);
      state.totalQuantity -= existingItem.quantity;
      state.items = state.items.filter((item) => item._id !== id);
    },
  },
});

export const { addItemToCart, removeItemToCart, removeWholeItemToCart } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
