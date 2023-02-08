import "./Rating.scss";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, className, ...rest }) => {
  return (
    <div className={`rating ${className}`}>
      {[...Array(5)].map((_, i) => (
        <span key={i} {...rest}>
          {rating > i ? <AiFillStar /> : <AiOutlineStar />}
        </span>
      ))}
    </div>
  );
};

export default Rating;
