import "./Cart.scss";
import Container from "../../components/Container/Container";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import CartItemMobile from "../../components/Cart/CartItemMobile/CartItemMobile";
import CartItem from "../../components/Cart/CartItem/CartItem";

const Cart = () => {
  return (
    <Container className={"cart"}>
      <table>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>

        <CartItem
          title={"Sony Headphone"}
          price={40}
          quantity={1}
          image={"/images/headphone.png"}
        />
        <CartItem
          title={"Sony Headphone"}
          price={40}
          quantity={1}
          image={"/images/headphone.png"}
        />
      </table>

      <div className="item-card-mobile">
        <p>Cart Items</p>

        <CartItemMobile
          title={"Sony Headphone"}
          price={40}
          quantity={1}
          image={"/images/headphone.png"}
        />
        <CartItemMobile
          title={"Sony Headphone"}
          price={40}
          quantity={1}
          image={"/images/headphone.png"}
        />
      </div>

      <div className="total-price">
        <table>
          <tr>
            <td>Subtotal</td>
            <td>$90.00</td>
          </tr>
          <tr>
            <td>Tax</td>
            <td>$05.00</td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td>$05.00</td>
          </tr>
          <tr className="final-price">
            <td>Total</td>
            <td>$100.00</td>
          </tr>
        </table>

        <Link to={`/checkout`} className={`checkout-btn`}>
          <Button>Check Out</Button>
        </Link>
      </div>
    </Container>
  );
};

export default Cart;
