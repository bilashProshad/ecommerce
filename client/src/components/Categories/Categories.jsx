import Category from "../Category/Category";
import "./Categories.scss";

const Categories = ({ data }) => {
  return (
    <div className="categories">
      <h2>Our Top Categories</h2>

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
