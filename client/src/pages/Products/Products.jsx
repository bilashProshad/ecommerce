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

const Products = () => {
  const [rating, setRating] = useState(0);
  const [outOfStock, setOutOfStock] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);

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

  return (
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
            {/* <div className="hr" /> */}
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
            {/* <div className="hr" /> */}
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
            {/* <div className="hr" /> */}
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
          <Product id={1} />
          <Product id={2} />
          <Product id={3} />
          <Product id={4} />
          <Product id={5} />
          <Product id={6} />
          <Product id={7} />
          <Product id={8} />
          <Product id={9} />
          <Product id={10} />
          <Product id={11} />
          <Product id={12} />
        </div>
      </div>
    </Container>
  );
};

export default Products;
