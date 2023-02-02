import "./Logo.scss";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const Logo = ({ href, className, ...rest }) => {
  return (
    <Link className={`logo ${className}`} to={href} {...rest}>
      <img src={logo} alt="logo" />
    </Link>
  );
};

export default Logo;
