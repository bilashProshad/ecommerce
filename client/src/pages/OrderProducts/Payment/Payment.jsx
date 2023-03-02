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
import Button from "../../../components/Button/Button";

const Payment = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
  };

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

          <Button type="submit" className={`payment-btn`}>
            Submit
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
