import "./FormWrapper.scss";

const FormWrapper = ({ children, className, ...rest }) => {
  return (
    <div className={`wrapper ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default FormWrapper;
