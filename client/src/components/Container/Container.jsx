import "./Container.scss";

const Container = ({ children, className, ...rest }) => {
  return (
    <div className={`container ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Container;
