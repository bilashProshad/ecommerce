import "./Orders.scss";
import Container from "../../components/Container/Container";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { myOrders } from "../../redux/actions/orderAction";
import { toast } from "react-hot-toast";
import { clearMyOrdersError } from "../../redux/slices/orderSlice";
import Loading from "../../components/Loading/Loading";

const Orders = () => {
  const { orders, loading, error } = useSelector((state) => state.myOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMyOrdersError());
    }
  }, [error, dispatch]);

  return (
    <Container className={`orders`}>
      <h2>My Orders</h2>

      {loading ? (
        <Loading />
      ) : (
        <div className="order-container">
          <table className="all-order">
            <thead>
              <tr className="header">
                <th>Order Id</th>
                <th>Status</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.orderStatus}</td>
                    <td>
                      {order.orderItems.length > 0 &&
                        order.orderItems.reduce(
                          (total, current) => total + current.quantity,
                          0
                        )}
                    </td>
                    <td>${order.totalPrice}</td>
                    <td>
                      <div className="link">
                        <Link to={`/orders/${order._id}`}>
                          <AiOutlineEye />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};

export default Orders;
