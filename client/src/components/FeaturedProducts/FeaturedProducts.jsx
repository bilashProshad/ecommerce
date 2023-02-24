import Product from "../Product/Product";
import "./FeaturedProducts.scss";

const FeaturedProducts = ({ products }) => {
  return (
    <div className={`featured-products`}>
      <h2>Feature Products</h2>

      <div>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
