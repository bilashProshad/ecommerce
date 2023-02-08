import Container from "../Container/Container";
import Product from "../Product/Product";
import "./Products.scss";

const Products = () => {
  return (
    <div className={`products`}>
      <h2>Feature Products</h2>

      <div>
        <Product id={1} />
        <Product id={2} />
        <Product id={3} />
        <Product id={4} />
        <Product id={5} />
        <Product id={6} />
        <Product id={7} />
      </div>
    </div>
  );
};

export default Products;
