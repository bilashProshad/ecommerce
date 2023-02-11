import { useState } from "react";
import ButtonQuantity from "../../components/ButtonQuantity/ButtonQuantity";
import Container from "../../components/Container/Container";
import ProductImages from "../../components/ProductImages/ProductImages";
import Ratings from "../../components/Rating/Rating";
import "./ProductDetails.scss";
import Button from "../../components/Button/Button";
import { Rating } from "react-simple-star-rating";
import Review from "../../components/Review/Review";

const ProductDetails = () => {
  const [productQuantity, setProductQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const incrementProductQuantity = () => {
    setProductQuantity((prev) => prev + 1);
  };

  const decrementProductQuantity = () => {
    setProductQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Catch Rating value
  const handleRating = (rate) => {
    // console.log(rate);
    setRating(rate);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    console.log(rating, review);
    setRating(0);
    setReview("");
  };

  return (
    <Container className={`product-details`}>
      <div className="top">
        <div className="image">
          <ProductImages />
        </div>
        <div className="details">
          <h2>Sony Wired Headphone</h2>
          <small className="id">Product # 634840c90bec13046c6f9d1a</small>
          <div className="hr" />
          <div className="p-rating">
            <Ratings rating={4} /> <span>(15 Reviews)</span>
          </div>
          <div className="hr" />
          <p className="desc">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
            accusamus ipsum non inventore corrupti est, itaque, optio tenetur
            vel eveniet, harum qui nam. Porro amet, maiores cumque molestias
            maxime incidunt!
          </p>
          <div className="hr" />
          <div className="price-cart-details">
            <h3 className="price">$500</h3>
            <div className="quantity">
              <ButtonQuantity
                value={productQuantity}
                max={5}
                onDecrement={decrementProductQuantity}
                onIncrement={incrementProductQuantity}
              />
              <span className="count-text">
                Only <span>10 items</span> Left!
              </span>
            </div>
            <Button className={`cart-btn`}>Add to Cart</Button>
          </div>
          <div className="hr" />
          <div className="submit-review">
            <h3>Submit a Review</h3>
            <Rating onClick={handleRating} size={25} fillColor="#e67e22" />
            <form onSubmit={submitReviewHandler}>
              <textarea
                placeholder="comment"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
      </div>
      <div className="bottom">
        <h2>REVIEWS</h2>

        <div className="user-reviews">
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
