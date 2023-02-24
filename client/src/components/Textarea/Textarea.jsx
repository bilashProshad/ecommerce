import "./Textarea.scss";

const Textarea = ({ className, placeholder = "", ...rest }) => {
  return (
    <span className="textarea">
      <textarea placeholder={placeholder} className={className} {...rest} />
    </span>
  );
};

export default Textarea;
