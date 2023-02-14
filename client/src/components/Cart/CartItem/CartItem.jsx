import "./CartItem.scss";

const CartItem = ({ title, price, quantity, image }) => {
  return (
    <tr className="cart-item">
      <td>
        <div className="info">
          <img src={image} alt="" />
          <div>
            <p>{title}</p>
            <small>
              Price: <strong>${price}</strong>
            </small>
            <button>Remove</button>
          </div>
        </div>
      </td>
      <td>
        <div className="quantity-btns">
          <button>-</button>
          <span>{quantity}</span>
          <button>+</button>
        </div>
      </td>
      <td>${price * quantity}</td>
    </tr>
  );
};

export default CartItem;
