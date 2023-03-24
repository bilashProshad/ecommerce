import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Loading from "../../../components/Loading/Loading";
import SideLayout from "../../../components/SideLayout/SideLayout";
import {
  getOrderDetails,
  updateOrder,
} from "../../../redux/actions/orderAction";
import {
  clearOrderDetailsError,
  clearUpdateOrderError,
  resetUpdateOrder,
} from "../../../redux/slices/orderSlice";
import "./ProcessOrder.scss";

const UpdateOrder = () => {
  const [status, setStatus] = useState("");
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const {
    loading: updateLoading,
    success,
    error: updateError,
  } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearOrderDetailsError());
    }

    if (success) {
      toast.success("Order status is successfully updated");
      dispatch(resetUpdateOrder());
      dispatch(getOrderDetails(id));
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearUpdateOrderError());
    }
  }, [error, dispatch, success, updateError, id]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    if (status === "") return;

    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  return (
    <SideLayout className={`all-products`}>
      {loading ? (
        <Loading />
      ) : (
        <div className="update-order">
          <div className="my-orders">
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
          </div>

          {order.orderStatus !== "Delivered" && (
            <div className="process-order">
              <form onSubmit={updateOrderSubmitHandler}>
                <h2>Process Order</h2>
                <select onChange={(e) => setStatus(e.target.value)}>
                  <option value="">Update Status</option>
                  {order.orderStatus === "Processing" && (
                    <option value="Shipped">Shipped</option>
                  )}
                  {order.orderStatus === "Shipped" && (
                    <option value="Delivered">Delivered</option>
                  )}
                </select>
                <Button type="submit">Process</Button>
              </form>
            </div>
          )}
        </div>
      )}
    </SideLayout>
  );
};

export default UpdateOrder;
