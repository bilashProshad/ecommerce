import "./ButtonOutline.scss";
import { MdOutlineShoppingCart } from "react-icons/md";

const ButtonOutlined = ({ children, className, type = "button", ...rest }) => {
  return (
    <>
      <button className={`button-outline ${className}`} type={type} {...rest}>
        {children}
      </button>
      <button
        className={`button-outline-small ${className}`}
        type={type}
        {...rest}
      >
        <MdOutlineShoppingCart />
      </button>
    </>
  );
};

export default ButtonOutlined;
