import { Link } from "react-router-dom";
import "./Product.scss";
import Rating from "../Rating/Rating";
import ButtonOutline from "../ButtonOutline/ButtonOutline";

const Product = ({ id, title, price, rating = 1, totalReviews }) => {
  const addCartHandler = (e) => {
    e.preventDefault();

    console.log(id, "is clicked");
  };

  return (
    <Link to={`/products/${id}`} className={`product`}>
      <img src="/images/headphone.png" alt="" />
      <div className="body">
        <h3>Sony Wired Headphone</h3>
        <span>
          <Rating rating={rating} /> <span>(150)</span>
        </span>
      </div>
      <div className="bottom">
        <div className="price">
          <small>Price</small>
          <h3>$599</h3>
        </div>
        <ButtonOutline onClick={addCartHandler}>Add to Cart</ButtonOutline>
      </div>
    </Link>
  );
};

export default Product;
