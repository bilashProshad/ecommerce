import "./CartItem.scss";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  addItemsToCart,
  removeAllCartItems,
  removeItemsFromCart,
} from "../../../redux/actions/cartAction";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const addItemToCartHandler = () => {
    dispatch(addItemsToCart({ item, quantity: 1, image: item.image }));
    toast.success(`Item is added to cart`);
  };

  const removeItemToCartHandler = () => {
    dispatch(removeItemsFromCart(item._id));
    toast.success(`Item removed from cart`);
  };

  const removeWholeItemToCartHandler = () => {
    dispatch(removeAllCartItems(item._id));
    toast.success(`Item removed from cart`);
  };

  return (
    <tr className="cart-item">
      <td>
        <div className="info">
          <img src={item.image} alt={item.name} />

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
