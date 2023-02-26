import ReactDOM from "react-dom";
import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import "./Navbar.scss";
import { useEffect, useState } from "react";
import { MdOutlineShoppingCart, MdDashboard } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import { Link, NavLink, useLocation } from "react-router-dom";
import LinkIcon from "../LinkIcon/LinkIcon";
import profilePic from "../../assets/profile-4.jpg";
import SearchInput from "../SearchInput/SearchInput";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const { isAuth, user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

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

  const logoutHander = () => {
    localStorage.removeItem("obCartItem");
    dispatch(logout());
    setShowMenu(false);
  };

  return (
    !location.pathname.includes("/admin") && (
      <>
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
          <Container>
            <Logo href={"/"} className="nav-logo" />

            <div className="right">
              <SearchInput className={`input-search-bar`} />

              <NavLink to="/products" className={`product-link`}>
                Products
              </NavLink>

              <LinkIcon href="/cart" count={totalQuantity} text="Cart">
                <MdOutlineShoppingCart />
              </LinkIcon>

              {isAuth ? (
                <>
                  <span className="vr-line" />
                  {/* <NavLink to="/profile"> */}
                  <span className="profile-pic">
                    <img
                      src={profilePic}
                      alt="profile icon"
                      onClick={() => setShowMenu(!showMenu)}
                    />
                    {showMenu && (
                      <>
                        {ReactDOM.createPortal(
                          <div
                            className="profile-backdrop"
                            onClick={() => setShowMenu(false)}
                          />,
                          document.getElementById("overlays")
                        )}
                        <ul className="profile-list">
                          <li>
                            <Link to={`/profile`}>
                              <BsPersonFill /> Profile
                            </Link>
                          </li>
                          <li>
                            <Link to={`/orders`}>
                              <IoMdCart /> My Orders
                            </Link>
                          </li>
                          {user.role === "admin" && (
                            <li>
                              <Link to={`/admin/dashboard`}>
                                <MdDashboard /> Dashboard
                              </Link>
                            </li>
                          )}
                          <li>
                            <button onClick={logoutHander}>
                              <IoLogOutSharp /> Logout
                            </button>
                          </li>
                        </ul>
                      </>
                    )}
                  </span>
                  {/* </NavLink> */}
                </>
              ) : (
                <NavLink to="/login">Login</NavLink>
              )}
            </div>
          </Container>

          {location.pathname === "/" && (
            <SearchInput className={`input-search-bar`} />
          )}
        </nav>
      </>
    )
  );
};

export default Navbar;
