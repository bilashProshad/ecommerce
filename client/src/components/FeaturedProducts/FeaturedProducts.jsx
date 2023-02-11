import Product from "../Product/Product";
import "./FeaturedProducts.scss";

const FeaturedProducts = () => {
  return (
    <div className={`featured-products`}>
      <h2>Feature Products</h2>

      <div>
        <Product id={1} rating={4} />
        <Product id={2} rating={3} />
        <Product id={3} rating={3.5} />
        <Product id={4} rating={5} />
        <Product id={5} rating={2} />
        <Product id={6} rating={4} />
        <Product id={7} rating={4.5} />
      </div>
    </div>
  );
};

export default FeaturedProducts;
