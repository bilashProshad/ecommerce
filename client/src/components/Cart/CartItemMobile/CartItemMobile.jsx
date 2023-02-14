import "./CartItemMobile.scss";

const CartItemMobile = ({ title, price, quantity, image }) => {
  return (
    <div className="cart-item-mobile">
      <div className="left">
        <img src={image} alt="" />
      </div>
      <div className="right">
        <p>{title}</p>
        <div>
          <small>
            Price: <strong>${price}</strong>
          </small>
          <div className="quantity-btns">
            <button>-</button>
            <span>{quantity}</span>
            <button>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemMobile;
