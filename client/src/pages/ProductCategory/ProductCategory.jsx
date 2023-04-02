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
import ResponsivePagination from "react-responsive-pagination";

const ProductCategory = () => {
  const [rating, setRating] = useState(0);
  const [outOfStock, setOutOfStock] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(500000);
  const [page, setPage] = useState(1);
  const [limit] = useState(16);
  const [totalPages, setTotalPages] = useState(1);

  const { id: categoryId } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error, totalProducts } = useSelector(
    (state) => state.products
  );
  const { loading: loadingCategories } = useSelector(
    (state) => state.categories
  );

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        getProductsByCategoryId(
          `${categoryId}?page=${page}&limit=${limit}&minPrice=${min}&maxPrice=${max}&outofstock=${outOfStock}&sortBy=${selectedOption}&rating=${rating}`
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
    categoryId,
    outOfStock,
    rating,
    selectedOption,
  ]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProductError());
    }

    if (totalProducts > 0) {
      setTotalPages(Math.ceil(totalProducts / limit));
    }
  }, [error, dispatch, totalProducts, limit]);

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
        </div>

        {/* <div className="right">
          {products.length > 0 &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div> */}

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

export default ProductCategory;
