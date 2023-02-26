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
import { BiCategoryAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import BackDrop from "../BackDrop/BackDrop";

const Sidebar = () => {
  const [showSubmenu, setShowSubment] = useState(false);
  const [showCategoryMenu, setCategoryMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={`mob-sidebar ${scrolled ? "scroll" : ""}`}>
        <div>
          <Logo href={"/"} />{" "}
          <button onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>{" "}
        </div>
      </div>
      <aside className={`sidebar ${showSidebar ? "show" : ""}`}>
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
                <NavLink to={`/admin/products`}>
                  <MdPostAdd /> <span>All</span>
                </NavLink>
                <NavLink to={`/admin/products/new`}>
                  <MdAdd /> <span>Create</span>
                </NavLink>
              </div>
            </div>
          </li>
          <li className="menu-item">
            <div className="submenu-item">
              <div
                className="submenu-title"
                onClick={() => setCategoryMenu(!showCategoryMenu)}
              >
                <BiCategoryAlt style={{ transform: "rotate(90deg)" }} />{" "}
                <span>Categories</span>
              </div>
              <div
                className={`submenu-options ${showCategoryMenu ? "show" : ""}`}
              >
                <NavLink to={`/admin/categories`}>
                  <MdPostAdd /> <span>All</span>
                </NavLink>
                <NavLink to={`/admin/categories/new`}>
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
    </>
  );
};

export default Sidebar;
