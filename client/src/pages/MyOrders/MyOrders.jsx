import "./MyOrders.scss";
import Container from "../../components/Container/Container";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { clearOrderDetailsError } from "../../redux/slices/orderSlice";
import { getSingleOrder } from "../../redux/actions/orderAction";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const MyOrders = () => {
  const { order, loading, error } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearOrderDetailsError());
    }
  }, [error, dispatch]);

  return loading ? (
    <Loading />
  ) : (
    <Container className={`my-orders`}>
      <h2>Order #{order._id}</h2>

      <div className="order-details">
        <div className="info">
          <h2>Shipping Info</h2>
          <div className="details">
            <p>
              <span>Name: </span>
              <span>{order?.user?.name}</span>
            </p>
            <p>
              <span>Phone: </span>
              <span>{order?.shippingInfo?.contactNo}</span>
            </p>
            <p>
              <span>Address: </span>
              <span>{`${order?.shippingInfo?.post}, ${order?.shippingInfo?.district}, ${order?.shippingInfo?.division}, ${order?.shippingInfo?.country}`}</span>
            </p>
          </div>
        </div>

        <div className="info">
          <h2>Payment</h2>
          <div className="details">
            <p>
              <span>Status: </span>
              <span>{order?.paymentInfo?.status}</span>
            </p>
            <p>
              <span>Amount: </span>
              <span>${order?.itemsPrice}</span>
            </p>
          </div>
        </div>

        <div className="info">
          <h2>Order</h2>
          <div className="details">
            <p>
              <span>Status: </span>
              <span>{order?.orderStatus}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bottom">
        <h2>Order Items</h2>
        <div className="cart-items">
          {order.orderItems &&
            order.orderItems.length > 0 &&
            order.orderItems.map((item) => (
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
    </Container>
  );
};

export default MyOrders;
