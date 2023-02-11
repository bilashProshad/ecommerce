import "./Rating.scss";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";

const Star = ({ filled }) => {
  return filled ? <BsStarFill /> : <BsStar />;
};

const HalfStar = () => {
  return <BsStarHalf />;
};

const Rating = ({ rating, className, ...rest }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<Star filled={true} key={i} />);
    } else if (i - 0.5 === rating) {
      stars.push(<HalfStar key={i} />);
    } else {
      stars.push(<Star filled={false} key={i} />);
    }
  }

  return <div className={`rating ${className}`}>{stars}</div>;
};

export default Rating;
