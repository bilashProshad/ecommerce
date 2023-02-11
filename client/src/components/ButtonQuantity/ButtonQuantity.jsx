import "./ButtonQuantity.scss";

const ButtonQuantity = ({
  onIncrement,
  onDecrement,
  value,
  className,
  ...rest
}) => {
  return (
    <span className={`quantity-button ${className}`}>
      <button onClick={onDecrement}>-</button>
      <p>{value}</p>
      <button onClick={onIncrement}>+</button>
    </span>
  );
};

export default ButtonQuantity;
