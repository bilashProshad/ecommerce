import "./Success.scss";
import Container from "../../../components/Container/Container";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { BsFillCheckCircleFill } from "react-icons/bs";

const Success = () => {
  return (
    <Container className={`success`}>
      <BsFillCheckCircleFill />
      <h2>Your order has been placed successfully</h2>
      <Link to={`/orders`}>
        <Button>View Orders</Button>
      </Link>
    </Container>
  );
};

export default Success;
