import { Link } from "react-router-dom";
import "./Category.scss";

const Category = ({ img, title, link, className, ...rest }) => {
  return (
    <Link to={link} className={`category ${className}`} {...rest}>
      <img src={img} alt={title} />
      <p>{title}</p>
    </Link>
  );
};

export default Category;
