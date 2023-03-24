import Rating from "../Rating/Rating";
import "./Review.scss";

const Review = ({ author, comment, rating }) => {
  return (
    <div className="review">
      <div className="dp">
        <img src="/images/profile-4.jpg" alt="" />
      </div>
      <div className="details">
        <h4>{author}</h4>
        <Rating rating={rating} />
        <p className="desc">{comment}</p>
      </div>
    </div>
  );
};

export default Review;
