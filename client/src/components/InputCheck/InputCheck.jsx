import "./InputCheck.scss";

const InputCheck = ({ text, ...rest }) => {
  return (
    <div className="checkbox">
      <input type="checkbox" {...rest} />

      <label htmlFor="wp-comment-cookies-consent">{text}</label>
    </div>
  );
};

export default InputCheck;
