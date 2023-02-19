import "./InputContainer.scss";

const InputContainer = ({ children, className, ...rest }) => {
  return (
    <div className={`input-container ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default InputContainer;
