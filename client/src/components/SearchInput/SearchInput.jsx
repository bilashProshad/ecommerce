import "./SearchInput.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchInput = ({ className, ...rest }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (searchQuery === "") {
      return;
    }

    navigate(`/products?q=${searchQuery}`);
  };

  return (
    <form
      className={`search-input ${className}`}
      onSubmit={submitHandler}
      {...rest}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Product"
      />
      <button>
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default SearchInput;
