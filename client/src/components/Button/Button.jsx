import "./Button.scss";
import { BiLoaderAlt } from "react-icons/bi";

const Button = ({
  children,
  className,
  loading = false,
  disabled,
  type = "button",
  ...rest
}) => {
  return (
    <button
      className={`button ${className}`}
      type={type}
      {...rest}
      disabled={disabled}
    >
      {loading ? <BiLoaderAlt /> : children}
    </button>
  );
};

export default Button;
