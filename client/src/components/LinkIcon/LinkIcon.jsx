import "./LinkIcon.scss";
import { NavLink } from "react-router-dom";

const LinkIcon = ({ children, href, count = 0, text, className, ...rest }) => {
  return (
    <NavLink to={href} className={`link-icon ${className}`} {...rest}>
      <span className="link-logo">
        {children}
        {count > 0 && <span className="badge">{count}</span>}
      </span>
      {text && <span className="text">{text}</span>}
    </NavLink>
  );
};

export default LinkIcon;
