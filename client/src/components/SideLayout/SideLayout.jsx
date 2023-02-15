import Sidebar from "../Sidebar/Sidebar";
import "./SideLayout.scss";

const SideLayout = ({ children, className, ...rest }) => {
  return (
    <div className="side-layout">
      <Sidebar />
      <div className={`body ${className}`} {...rest}>
        {children}
      </div>
    </div>
  );
};

export default SideLayout;
