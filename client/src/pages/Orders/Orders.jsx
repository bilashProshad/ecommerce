import "./Orders.scss";
import Container from "../../components/Container/Container";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <Container className={`orders`}>
      <h2>My Orders</h2>

      <div className="order-container">
        <table className="all-order">
          <tr className="header">
            <th>Order Id</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td>634840c90bec13046c6f9d1a</td>
            <td>Shipped</td>
            <td>5</td>
            <td>550</td>
            <td>
              <div className="link">
                <Link to={`/634840c90bec13046c6f9d1a`}>
                  <AiOutlineEye />
                </Link>
              </div>
            </td>
          </tr>
          <tr>
            <td>634840c90bec13046c6f9d1a</td>
            <td>Shipped</td>
            <td>5</td>
            <td>550</td>
            <td>
              <div className="link">
                <Link to={`/634840c90bec13046c6f9d1a`}>
                  <AiOutlineEye />
                </Link>
              </div>
            </td>
          </tr>
          <tr>
            <td>634840c90bec13046c6f9d1a</td>
            <td>Shipped</td>
            <td>5</td>
            <td>550</td>
            <td>
              <div className="link">
                <Link to={`/634840c90bec13046c6f9d1a`}>
                  <AiOutlineEye />
                </Link>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </Container>
  );
};

export default Orders;
