import "./Sidebar.scss";
import {
  MdDashboard,
  MdRateReview,
  MdOutlineListAlt,
  MdAdd,
  MdPostAdd,
} from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { useState } from "react";

const Sidebar = () => {
  const [showSubmenu, setShowSubment] = useState(false);

  return (
    <aside className="sidebar">
      <Logo href={"/"} />
      <ul className="menu-list">
        <li className="menu-item">
          <NavLink to={`/admin/dashboard`}>
            <MdDashboard /> <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="menu-item">
          <div className="submenu-item">
            <div
              className="submenu-title"
              onClick={() => setShowSubment(!showSubmenu)}
            >
              <RiArrowLeftRightFill style={{ transform: "rotate(90deg)" }} />{" "}
              <span>Products</span>
            </div>
            <div className={`submenu-options ${showSubmenu ? "show" : ""}`}>
              <NavLink to={`/admin/products/all`}>
                <MdPostAdd /> <span>All</span>
              </NavLink>
              <NavLink to={`/admin/products/create`}>
                <MdAdd /> <span>Create</span>
              </NavLink>
            </div>
          </div>
        </li>
        <li className="menu-item">
          <NavLink to={`/admin/orders`}>
            <MdOutlineListAlt /> <span>Orders</span>
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to={`/admin/users`}>
            <HiUsers /> <span>Users</span>
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to={`/admin/reviews`}>
            <MdRateReview /> <span>Reviews</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
