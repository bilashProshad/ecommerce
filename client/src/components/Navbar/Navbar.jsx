import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import "./Navbar.scss";
import { useEffect, useState } from "react";
import { BiHeart } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import LinkIcon from "../LinkIcon/LinkIcon";
import profilePic from "../../assets/profile-4.jpg";
import SearchInput from "../SearchInput/SearchInput";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Container>
        <Logo href={"/"} className="nav-logo" />

        <div className="right">
          <SearchInput className={`input-search-bar`} />

          <NavLink to="/products" className={`product-link`}>
            Products
          </NavLink>

          {/* <LinkIcon href="/wishlist" count={3}>
            <BiHeart />
          </LinkIcon> */}

          <LinkIcon href="/cart" count={5} text="Cart">
            <MdOutlineShoppingCart />
          </LinkIcon>

          <NavLink to="/login">Login</NavLink>
          {/* <span className="vr-line" />
          <NavLink to="/profile">
            <img src={profilePic} alt="profile icon" />
          </NavLink> */}
        </div>
      </Container>

      {location.pathname === "/" && (
        <SearchInput className={`input-search-bar`} />
      )}
    </nav>
  );
};

export default Navbar;
