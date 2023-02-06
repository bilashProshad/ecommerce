import "./Button.scss";

const Button = ({ children, className, type = "button", ...rest }) => {
  return (
    <button className={`button ${className}`} type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;
