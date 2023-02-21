import "./BackDrop.scss";
import ReactDOM from "react-dom";

const BackDrop = ({ onClick, className, ...rest }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={`backdrop ${className}`} onClick={onClick} {...rest} />,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default BackDrop;
