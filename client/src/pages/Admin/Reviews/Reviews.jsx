import Button from "../../../components/Button/Button";
import Form from "../../../components/Form/Form";
import Input from "../../../components/Input/Input";
import InputContainer from "../../../components/InputContainer/InputContainer";
import SideLayout from "../../../components/SideLayout/SideLayout";
import Table from "../../../components/Table/Table";
import { useInputValidate } from "../../../hooks/useInputValidate";
import "./Reviews.scss";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUserReview,
  getAllReview,
} from "../../../redux/actions/reviewAction";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  clearAllReviewError,
  clearDeleteUserReviewError,
  resetDeleteUserReview,
} from "../../../redux/slices/reviewSlice";

const Reviews = () => {
  const headers = ["Review Id", "User", "Comment", "Rating", "Actions"];

  const [productId, setproductId, productIdError, isproductIdTouched] =
    useInputValidate();

  const [product, setProduct] = useState("");

  const dispatch = useDispatch();

  const { reviews, loading, error } = useSelector((state) => state.reviews);
  const { success: isDeleted, error: deleteError } = useSelector(
    (state) => state.reviewModify
  );

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReview(productId));
  };

  const deleteReviewHandler = (e, productId, reviewId) => {
    e.preventDefault();

    console.log({ productId, reviewId });

    setProduct(productId);
    dispatch(deleteUserReview({ productId, reviewId }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllReviewError());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearDeleteUserReviewError());
    }

    if (isDeleted) {
      toast.success("Review is deleted");
      dispatch(resetDeleteUserReview());
      dispatch(getAllReview(product));
    }
  }, [error, dispatch, isDeleted, deleteError, product]);

  return (
    <SideLayout className={"reviews"}>
      <h2 className="title">Reviews</h2>

      <Form onSubmit={submitHandler} className={"search-review"}>
        <InputContainer>
          <Input
            type="text"
            placeholder="Product Id"
            value={productId}
            onChange={(e) => setproductId(e.target.value)}
            onBlur={isproductIdTouched}
            className={productIdError ? "error" : ""}
          />
          {productIdError && (
            <span className="error-text">*** Please enter product id</span>
          )}
        </InputContainer>
        <Button type="submit">Search</Button>
      </Form>

      {reviews.length > 0 && (
        <Table headers={headers} className="review-list">
          {reviews.length > 0 &&
            reviews.map((review) => (
              <tr key={review._id}>
                <td>{review._id}</td>
                <td>{review.author.name}</td>
                <td>{review.comment}</td>
                <td>{review.rating}</td>
                <td>
                  <div className="link">
                    <Link
                      to={`/admin/products/6546546`}
                      onClick={(e) =>
                        deleteReviewHandler(e, review.product, review._id)
                      }
                    >
                      <MdDelete />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
        </Table>
      )}
    </SideLayout>
  );
};

export default Reviews;
