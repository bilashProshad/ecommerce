import {
  addToCart,
  removeCartItem,
  removeWholeCartItems,
} from "../slices/cartSlice";

export const addItemsToCart = (product) => async (dispatch, getState) => {
  const item = {
    _id: product.item._id,
    product: product.item._id,
    name: product.item.name,
    price: product.item.price,
    stock: product.item.stock,
    image: product.image,
  };

  const quantity = product.quantity;

  dispatch(addToCart({ item, quantity }));

  const { items, totalQuantity } = getState().cart;

  localStorage.setItem("obCartItem", JSON.stringify({ items, totalQuantity }));
};

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch(removeCartItem(id));

  const { items, totalQuantity } = getState().cart;

  localStorage.setItem("obCartItem", JSON.stringify({ items, totalQuantity }));
};

export const removeAllCartItems = (id) => async (dispatch, getState) => {
  dispatch(removeWholeCartItems(id));

  const { items, totalQuantity } = getState().cart;

  localStorage.setItem("obCartItem", JSON.stringify({ items, totalQuantity }));
};
