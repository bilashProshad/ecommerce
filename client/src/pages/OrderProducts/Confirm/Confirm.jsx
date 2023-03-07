import Container from "../../../components/Container/Container";
import "./Confirm.scss";
import { useSelector } from "react-redux";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Confirm = () => {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const address = JSON.parse(localStorage.getItem("obAddress"));

  const navigate = useNavigate();

  const subtotal = items.reduce(
    (total, currentItem) => total + currentItem.price * currentItem.quantity,
    0
  );
  const tax = Math.ceil(subtotal * 0.1);
  const shippingCharges = subtotal > 500 ? 0 : 5;
  const totalPrice = subtotal + shippingCharges + tax;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate(`/order/payment`);
  };

  return (
    <Container className={`confirm`}>
      <div className="confirm-wrapper">
        <div className="left">
          <div className="shipping">
            <h2>Shipping Info</h2>
            <div className="user-details">
              <p>
                <span>Name: </span>
                <span>{user.name}</span>
              </p>
              <p>
                <span>Phone: </span>
                <span>{address.contactNo}</span>
              </p>
              <p>
                <span>Address: </span>
                <span>{`${address.post}, ${address.district}, ${address.division}, ${address.country}`}</span>
              </p>
            </div>
          </div>
          <div className="bottom">
            <h2>Your Cart Item</h2>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <p>
                    <span>
                      <em>{item.name}</em>
                    </span>
                    <span>
                      {item.quantity} X {item.price} ={" "}
                      <span className="total-price">
                        ${item.quantity * item.price}
                      </span>
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="middle" />
        <div className="right">
          <div>
            <h2>Order Summary</h2>
            <div className="order-summary">
              <p>
                Subtotal: <span>${subtotal}</span>
              </p>
              <p>
                Shipping Charges: <span>${shippingCharges}</span>
              </p>
              <p>
                Tax: <span>${tax}</span>
              </p>
              <p className="total">
                Total: <span>${totalPrice}</span>
              </p>
            </div>

            <Button onClick={proceedToPayment}>Proceed To Payment</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Confirm;
