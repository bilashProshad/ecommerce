import Container from "../../../components/Container/Container";
import "./Confirm.scss";
import { useSelector } from "react-redux";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";

const Confirm = () => {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const subtotal = items.reduce(
    (total, currentItem) => total + currentItem.price * currentItem.quantity,
    0
  );
  const tax = Math.ceil(subtotal * 0.15);
  const shipping = subtotal > 2000 ? 0 : 100;

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
                <span>{user.address.contactNo}</span>
              </p>
              <p>
                <span>Address: </span>
                <span>{`${user.address.post}, ${user.address.district}, ${user.address.division}, ${user.address.country}`}</span>
              </p>
            </div>
          </div>
          <div className="bottom">
            <h2>Your Cart Item</h2>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="img">
                    {item.images.length > 0 && (
                      <img src={item.images[0].url} alt={item.name} />
                    )}
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
                Shipping Charges: <span>${shipping}</span>
              </p>
              <p>
                Tax: <span>${tax}</span>
              </p>
              <p className="total">
                Total: <span>${subtotal + shipping + tax}</span>
              </p>
            </div>
            <Link to={`/order/payment`}>
              <Button>Proceed To Payment</Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Confirm;
