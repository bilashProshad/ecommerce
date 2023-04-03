// import { Link } from "react-router-dom";
import Category from "../Category/Category";
import "./Categories.scss";
// import { HiArrowRight } from "react-icons/hi";

const Categories = ({ data }) => {
  return (
    <div className="categories">
      <div className="categories-title">
        <h2>Our Top Categories</h2>
        {/* <Link to={`/products`}>
          See All <HiArrowRight />
        </Link> */}
      </div>

      <div>
        {data.map((d) => (
          <Category
            key={d._id}
            title={d.name}
            link={`/category/${d._id}`}
            img={d.image.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
