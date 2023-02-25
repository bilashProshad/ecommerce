import "./Cart.scss";
import Container from "../../components/Container/Container";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import CartItemMobile from "../../components/Cart/CartItemMobile/CartItemMobile";
import CartItem from "../../components/Cart/CartItem/CartItem";
import { useSelector } from "react-redux";

const Cart = () => {
  const { items, totalQuantity } = useSelector((state) => state.cart);

  return (
    <Container className={"cart"}>
      {totalQuantity <= 0 ? (
        <p className="empty-msg">Cart item is empty</p>
      ) : (
        <>
          <table>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>

            {totalQuantity > 0 &&
              items.map((item) => <CartItem key={item._id} item={item} />)}
          </table>

          <div className="item-card-mobile">
            <p>Cart Items</p>
            {totalQuantity > 0 &&
              items.map((item) => (
                <CartItemMobile key={item._id} item={item} />
              ))}
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
        </>
      )}
    </Container>
  );
};

export default Cart;
