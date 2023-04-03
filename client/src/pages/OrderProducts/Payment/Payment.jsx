import "./Payment.scss";
import { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { MdCreditCard, MdEvent, MdVpnKey } from "react-icons/md";
import { createOrder } from "../../../redux/actions/orderAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  clearCreateOrderError,
  resetCreateOrder,
} from "../../../redux/slices/orderSlice";
import { resetCartItems } from "../../../redux/slices/cartSlice";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { error, success } = useSelector((state) => state.newOrder);

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();

  const server = process.env.REACT_APP_SERVER;

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo: user.address._id,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${server}/api/v1/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: user.address.post,
              city: user.address.district,
              state: user.address.division,
              // postal_code: shippingInfo.pinCode,
              country: "BD",
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          toast.success("Payment Successfull");
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearCreateOrderError());
    }

    if (success) {
      localStorage.removeItem("obCartItem");
      localStorage.removeItem("obAddress");
      dispatch(resetCreateOrder());
      dispatch(resetCartItems());
      navigate("/order/success");
    }
  }, [dispatch, error, success, navigate]);

  return (
    <Fragment>
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <p>Card Info</p>
          <div>
            <MdCreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <MdEvent />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <MdVpnKey />
            <CardCvcElement className="paymentInput" />
          </div>

          <button ref={payBtn} type="submit" className={`payment-btn`}>
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
