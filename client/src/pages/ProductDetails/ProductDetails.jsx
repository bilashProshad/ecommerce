import { useEffect, useState } from "react";
import ButtonQuantity from "../../components/ButtonQuantity/ButtonQuantity";
import Container from "../../components/Container/Container";
import ProductImages from "../../components/ProductImages/ProductImages";
import Ratings from "../../components/Rating/Rating";
import "./ProductDetails.scss";
import Button from "../../components/Button/Button";
import { Rating } from "react-simple-star-rating";
import Review from "../../components/Review/Review";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearProductError } from "../../redux/slices/productSlice";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productAction";
import Loading from "../../components/Loading/Loading";
import { addItemsToCart } from "../../redux/actions/cartAction";

const ProductDetails = () => {
  const [productQuantity, setProductQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const { product, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const { id } = useParams();

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

  const addItemToCartHandler = () => {
    dispatch(addItemsToCart({ item: product, quantity: productQuantity }));
    toast.success(`Item is added to cart`);
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductError());
    }
  }, [error, dispatch]);

  return loading ? (
    <Loading />
  ) : (
    <Container className={`product-details`}>
      <div className="top">
        <div className="image">
          {product.images && <ProductImages images={product.images} />}
        </div>
        <div className="details">
          <h2>{product.name}</h2>
          <small className="id">Product # {product._id}</small>
          <div className="hr" />
          <div className="p-rating">
            <Ratings rating={product.ratings} />{" "}
            <span>({product.numOfReview} Reviews)</span>
          </div>
          <div className="hr" />
          <p className="desc">{product.description}</p>
          <div className="hr" />
          <div className="price-cart-details">
            <h3 className="price">${product.price}</h3>
            <div className="quantity">
              <ButtonQuantity
                value={productQuantity}
                max={5}
                onDecrement={decrementProductQuantity}
                onIncrement={incrementProductQuantity}
              />
              <span className="count-text">
                {product.stock <= 10 ? "Only" : ""}{" "}
                <span>{product.stock} items</span> Left!
              </span>
            </div>
            <Button className={`cart-btn`} onClick={addItemToCartHandler}>
              Add to Cart
            </Button>
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
