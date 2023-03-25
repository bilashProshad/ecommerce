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
import {
  createReview,
  deleteReview,
  myReview,
  updateReview,
} from "../../redux/actions/reviewAction";
import {
  clearNewReviewError,
  resetReviewSuccess,
} from "../../redux/slices/reviewSlice";

const ProductDetails = () => {
  const [productQuantity, setProductQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editReview, setEditReview] = useState(false);

  const { isAuth } = useSelector((state) => state.auth);
  const { product, loading, error } = useSelector((state) => state.product);
  const {
    review,
    loading: reviewLoading,
    error: reviewError,
    isAdded,
    isUpdated,
    isDeleted,
  } = useSelector((state) => state.review);
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

    dispatch(createReview({ id, rating, comment }));
  };

  const submitUpdateReviewHander = (e) => {
    e.preventDefault();

    dispatch(
      updateReview({ productId: id, reviewId: review._id, rating, comment })
    );
  };

  const deleteReviewHandler = () => {
    dispatch(deleteReview({ productId: id, reviewId: review._id }));
  };

  const addItemToCartHandler = () => {
    dispatch(
      addItemsToCart({
        item: product,
        quantity: productQuantity,
        image: product.images[0].url,
      })
    );
    toast.success(`Item is added to cart`);
  };

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (isAuth) {
      dispatch(myReview(id));
    }
  }, [dispatch, id, isAuth]);

  useEffect(() => {
    if (editReview) {
      setComment(review.comment);
      setRating(review.rating);
    }
  }, [editReview, review]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductError());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearNewReviewError());
    }

    if (isAdded) {
      setRating(0);
      setComment("");
      toast.success("Review added successfully");
      dispatch(resetReviewSuccess());
    }

    if (isUpdated) {
      toast.success("Review updated successfully");
      dispatch(resetReviewSuccess());
      setEditReview(false);
    }

    if (isDeleted) {
      toast.success("Review deleted successfully");
      dispatch(resetReviewSuccess());
      setEditReview(false);
    }
  }, [error, dispatch, reviewError, isAdded, isUpdated, isDeleted]);

  return loading || reviewLoading ? (
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
          {!review.rating && (
            <div className="submit-review">
              <h3>Submit a Review</h3>
              <Rating onClick={handleRating} size={25} fillColor="#e67e22" />
              <form onSubmit={submitReviewHandler}>
                <textarea
                  placeholder="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button type="submit">Submit</Button>
              </form>
            </div>
          )}

          {review.rating && !editReview && (
            <div className="my-review">
              <h3>My Review</h3>
              <Ratings rating={review.rating} />
              <p>{review.comment}</p>
              <div className="buttons">
                <Button onClick={() => setEditReview(true)}>Edit</Button>
                <Button onClick={() => deleteReviewHandler()}>Delete</Button>
              </div>
            </div>
          )}

          {editReview && (
            <div className="submit-review">
              <h3>Update Review</h3>
              <Rating
                onClick={handleRating}
                size={25}
                fillColor="#e67e22"
                initialValue={review.rating}
              />
              <form onSubmit={submitUpdateReviewHander}>
                <textarea
                  placeholder="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="update-btns">
                  <Button type="submit">Update</Button>
                  <Button type="submit" onClick={() => setEditReview(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="bottom">
        <h2>REVIEWS</h2>

        <div className="user-reviews">
          {product &&
            product.reviews &&
            product.reviews.length > 0 &&
            product.reviews.map((review) => (
              <Review
                key={review._id}
                author={review.author.name}
                comment={review.comment}
                rating={review.rating}
              />
            ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
