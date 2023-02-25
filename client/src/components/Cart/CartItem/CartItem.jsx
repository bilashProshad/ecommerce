import "./CartItem.scss";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  removeItemToCart,
  removeWholeItemToCart,
} from "../../../redux/slices/cartSlice";
import toast from "react-hot-toast";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const addItemToCartHandler = () => {
    dispatch(addItemToCart({ item, quantity: 1 }));
    toast.success(`Item is added to cart`);
  };

  const removeItemToCartHandler = () => {
    dispatch(removeItemToCart(item._id));
    toast.success(`Item removed from cart`);
  };

  const removeWholeItemToCartHandler = () => {
    dispatch(removeWholeItemToCart(item._id));
    toast.success(`Item removed from cart`);
  };

  return (
    <tr className="cart-item">
      <td>
        <div className="info">
          {item.images.length > 0 && (
            <img src={item.images[0].url} alt={item.name} />
          )}
          <div>
            <p>{item.name}</p>
            <small>
              Price: <strong>${item.price}</strong>
            </small>
            <button onClick={removeWholeItemToCartHandler}>Remove</button>
          </div>
        </div>
      </td>
      <td>
        <div className="quantity-btns">
          <button onClick={removeItemToCartHandler}>-</button>
          <span>{item.quantity}</span>
          <button onClick={addItemToCartHandler}>+</button>
        </div>
      </td>
      <td>${item.price * item.quantity}</td>
    </tr>
  );
};

export default CartItem;
