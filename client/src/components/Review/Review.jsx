import Rating from "../Rating/Rating";
import "./Review.scss";

const Review = () => {
  return (
    <div className="review">
      <div className="dp">
        <img src="/images/profile-4.jpg" alt="" />
      </div>
      <div className="details">
        <h4>James David D.</h4>
        <Rating rating={4} />
        <p className="desc">
          It was really a great experience from first module to the last module.
          I Highly recommend to anyone who wants to start their web devolopment
          journey.
        </p>
      </div>
    </div>
  );
};

export default Review;
