import { Link } from "react-router-dom";
import Product from "../Product/Product";
import "./FeaturedProducts.scss";
import { HiArrowRight } from "react-icons/hi";

const FeaturedProducts = ({ products }) => {
  return (
    <div className={`featured-products`}>
      <div className="featured-title">
        <h2>Feature Products</h2>
        <Link to={`/products`}>
          See All <HiArrowRight />
        </Link>
      </div>

      <div>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
