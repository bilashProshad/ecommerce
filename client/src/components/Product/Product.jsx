import { Link } from "react-router-dom";
import "./Product.scss";
import Rating from "../Rating/Rating";
import ButtonOutline from "../ButtonOutline/ButtonOutline";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addItemsToCart } from "../../redux/actions/cartAction";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addCartHandler = (e) => {
    e.preventDefault();

    dispatch(
      addItemsToCart({
        item: product,
        quantity: 1,
        image: product.images[0].url,
      })
    );
    toast.success(`Item is added to cart`);
  };

  return (
    <Link to={`/products/${product._id}`} className={`product`}>
      <div className="image">
        <img src={product.images[0].url} alt={product.name} />
      </div>
      <div className="details">
        <div className="body">
          <h3>{product.name}</h3>
          <span>
            <Rating rating={product.ratings} />{" "}
            <span>({product.numOfReview})</span>
          </span>
        </div>
        <div className="bottom">
          <div className="price">
            <small>Price</small>
            <h3>${product.price}</h3>
          </div>
          <ButtonOutline onClick={addCartHandler}>Add to Cart</ButtonOutline>
        </div>
      </div>
    </Link>
  );
};

export default Product;
