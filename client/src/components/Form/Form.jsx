import "./Form.scss";

const Form = ({ children, className, onSubmit, style, ...rest }) => {
  return (
    <form
      className={`form ${className}`}
      onSubmit={onSubmit}
      style={style}
      {...rest}
    >
      {children}
    </form>
  );
};

export default Form;
