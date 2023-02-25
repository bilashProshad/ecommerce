import { Link } from "react-router-dom";
import "./Product.scss";
import Rating from "../Rating/Rating";
import ButtonOutline from "../ButtonOutline/ButtonOutline";
import { addItemToCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addCartHandler = (e) => {
    e.preventDefault();

    dispatch(addItemToCart({ item: product, quantity: 1 }));
    toast.success(`Item is added to cart`);
  };

  return (
    <Link to={`/products/${product._id}`} className={`product`}>
      <img src={product.images[0].url} alt={product.name} />
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
    </Link>
  );
};

export default Product;
