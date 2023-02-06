import "./SearchInput.scss";
import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = ({ className, ...rest }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("hello");
  };

  return (
    <form
      className={`search-input ${className}`}
      onSubmit={submitHandler}
      {...rest}
    >
      <input type="text" placeholder="Search Product" />
      <button>
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default SearchInput;
