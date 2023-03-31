import Rating from "../Rating/Rating";
import "./Review.scss";

const Review = ({ author, comment, rating, avatar }) => {
  return (
    <div className="review">
      <div className="dp">
        <img src={avatar} alt={author} />
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
