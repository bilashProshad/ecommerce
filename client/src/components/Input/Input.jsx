import "./Input.scss";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const Input = ({
  children,
  type = "text",
  className,
  placeholder = "",
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <span className="input">
      <input
        type={showPassword ? "text" : type}
        className={className}
        placeholder={placeholder}
        {...rest}
      />
      <span onClick={showPasswordHandler}>
        {type === "password" && showPassword && <AiOutlineEyeInvisible />}
        {type === "password" && !showPassword && <AiOutlineEye />}
      </span>
    </span>
  );
};

export default Input;
