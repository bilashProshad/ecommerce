import "./Products.scss";
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
import { getAllProduct } from "../../redux/actions/productAction";
import { clearCategoriesError } from "../../redux/slices/categoriesSlice";
import { getAllCategories } from "../../redux/actions/categoryAction";
import { useSearchParams } from "react-router-dom";
import ResponsivePagination from "react-responsive-pagination";

const Products = () => {
  const [rating, setRating] = useState(0);
  const [outOfStock, setOutOfStock] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(500000);
  const [page, setPage] = useState(1);
  const [limit] = useState(16);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { products, loading, error, totalProducts } = useSelector(
    (state) => state.products
  );
  const {
    categories: fetchedCategories,
    loading: loadingCategories,
    error: errorCategories,
  } = useSelector((state) => state.categories);

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
      setCategories([...categories, name]);
    } else {
      setCategories(categories.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    const search = searchParams.get("q");
    let q = "";

    if (search) {
      q = search;
    }

    const timeout = setTimeout(() => {
      dispatch(
        getAllProduct(
          `page=${page}&limit=${limit}&minPrice=${min}&maxPrice=${max}&categories=${categories}&outofstock=${outOfStock}&sortBy=${selectedOption}&rating=${rating}&q=${q}`
        )
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [
    dispatch,
    limit,
    page,
    min,
    max,
    categories,
    outOfStock,
    rating,
    selectedOption,
    searchParams,
  ]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProductError());
    }

    if (errorCategories) {
      toast.error(errorCategories);
      dispatch(clearCategoriesError());
    }

    if (totalProducts > 0) {
      setTotalPages(Math.ceil(totalProducts / limit));
    }

    dispatch(getAllCategories());
  }, [error, dispatch, errorCategories, totalProducts, limit]);

  return loading && loadingCategories ? (
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
              onChange={({ min, max }) => {
                setMin(min);
                setMax(max);
              }}
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
            {fetchedCategories &&
              fetchedCategories.length > 0 &&
              fetchedCategories.map((category) => (
                <div key={category._id}>
                  <InputCheck
                    text={category.name}
                    type="checkbox"
                    name={category._id}
                    checked={categories.includes(category._id)}
                    onChange={handleCheckboxChange}
                  />
                </div>
              ))}
          </Card>
        </div>

        <div className="right">
          <div className="all-product">
            {products.length > 0 &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>

          {totalPages > 1 && (
            <ResponsivePagination
              current={page}
              total={totalPages}
              onPageChange={setPage}
            />
          )}

          {products.length < 1 && (
            <p className="not-found-msg">No products found</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Products;
