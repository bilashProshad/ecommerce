import "../Products/Products.scss";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import { Rating } from "react-simple-star-rating";
import { useEffect, useState } from "react";
import MultiRangeSlider from "../../components/MultiRangeSlider/MultiRangeSlider";
import InputCheck from "../../components/InputCheck/InputCheck";
import Product from "../../components/Product/Product";
import InputRadio from "../../components/InputRadio/InputRadio";
import { BsFilterLeft } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import BackDrop from "../../components/BackDrop/BackDrop";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearAllProductError } from "../../redux/slices/productSlice";
import Loading from "../../components/Loading/Loading";
import { getProductsByCategoryId } from "../../redux/actions/productAction";
import { useParams } from "react-router-dom";

const ProductCategory = () => {
  const [rating, setRating] = useState(0);
  const [outOfStock, setOutOfStock] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { id: categoryId } = useParams();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Catch Rating value
  const handleRating = (rate) => {
    // console.log(rate);
    setRating(rate);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setCategory([...category, name]);
    } else {
      setCategory(category.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    dispatch(getProductsByCategoryId(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProductError());
    }
  }, [error, dispatch]);

  return loading ? (
    <Loading />
  ) : (
    <Container className={`products`}>
      <div className="top-bar">
        <button onClick={() => setShowSideBar(true)}>
          <BsFilterLeft /> <span>Filter</span>
        </button>

        <span className="sort-price">
          <span>Sort by (Price):</span>
          <select onChange={handleOptionChange}>
            <option value="">Default</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </span>
      </div>

      <div className="bottom">
        <div className={`left ${showSideBar ? "active" : ""}`}>
          {showSideBar && (
            <BackDrop
              className={showSideBar ? "active" : ""}
              onClick={() => setShowSideBar(false)}
            />
          )}

          <button onClick={() => setShowSideBar(false)}>
            Close <IoExitOutline />
          </button>

          <Card>
            <p>Price</p>
            <MultiRangeSlider
              min={0}
              max={500000}
              onChange={({ min, max }) =>
                console.log(`min = ${min}, max = ${max}`)
              }
            />
          </Card>
          <Card>
            <p>Sort By (Price)</p>
            <div>
              <InputRadio
                text={"Low to High"}
                name={"sort"}
                id="asc"
                value="asc"
                checked={selectedOption === "asc"}
                onChange={handleOptionChange}
              />
              <InputRadio
                text={"High to Low"}
                name={"sort"}
                id="desc"
                value="desc"
                checked={selectedOption === "desc"}
                onChange={handleOptionChange}
              />
            </div>
          </Card>
          <Card>
            <p>Rating</p>
            <div className="rating-filter">
              <Rating onClick={handleRating} size={30} fillColor="#e67e22" />
            </div>
          </Card>

          <Card>
            <p>Availability</p>
            <div>
              <InputCheck
                text={"Out of Stock"}
                type="checkbox"
                checked={outOfStock}
                onChange={(e) => setOutOfStock(e.target.checked)}
              />
            </div>
          </Card>

          <Card>
            <p>Categories</p>
            <div>
              <InputCheck
                text={"Laptop"}
                type="checkbox"
                name={"laptop"}
                checked={category.includes("laptop")}
                onChange={handleCheckboxChange}
              />
            </div>
            <div>
              <InputCheck
                text={"Mobile"}
                type="checkbox"
                name={"mobile"}
                checked={category.includes("mobile")}
                onChange={handleCheckboxChange}
              />
            </div>
            <div>
              <InputCheck
                text={"Books"}
                type="checkbox"
                name={"books"}
                checked={category.includes("books")}
                onChange={handleCheckboxChange}
              />
            </div>
            <div>
              <InputCheck
                text={"Men's Fashion"}
                type="checkbox"
                name={"fashion"}
                checked={category.includes("fashion")}
                onChange={handleCheckboxChange}
              />
            </div>
          </Card>
        </div>

        <div className="right">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductCategory;
