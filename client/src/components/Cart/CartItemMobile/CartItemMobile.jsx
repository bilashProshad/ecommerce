import "./CartItemMobile.scss";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  removeItemToCart,
} from "../../../redux/slices/cartSlice";
import toast from "react-hot-toast";

const CartItemMobile = ({ item }) => {
  const dispatch = useDispatch();

  const addItemToCartHandler = () => {
    dispatch(addItemToCart({ item, quantity: 1 }));
    toast.success(`Item is added to cart`);
  };

  const removeItemToCartHandler = () => {
    dispatch(removeItemToCart(item._id));
    toast.success(`Item removed from cart`);
  };

  return (
    <div className="cart-item-mobile">
      <div className="left">
        {item.images.length > 0 && (
          <img src={item.images[0].url} alt={item.name} />
        )}
      </div>
      <div className="right">
        <p>{item.name}</p>
        <div>
          <small>
            Price: <strong>${item.price}</strong>
          </small>
          <div className="quantity-btns">
            <button onClick={removeItemToCartHandler}>-</button>
            <span>{item.quantity}</span>
            <button onClick={addItemToCartHandler}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemMobile;
