import "./InputRadio.scss";

const InputRadio = ({ text, name, id, ...rest }) => {
  return (
    <p className="input-radio">
      <input type="radio" name={name} id={id} {...rest} />
      <label htmlFor={id}>{text}</label>
    </p>
  );
};

export default InputRadio;
