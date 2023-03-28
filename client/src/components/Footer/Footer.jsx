import "./Footer.scss";
import logo from "../../assets/logo-white.svg";
import appstore from "../../assets/Appstore.png";
import playstore from "../../assets/playstore.png";
import { Link, useLocation } from "react-router-dom";
import Container from "../Container/Container";

const Footer = () => {
  const location = useLocation();

  return (
    !location.pathname.includes("/admin") &&
    !location.pathname.includes("/order/shipping") &&
    !location.pathname.includes("/order/confirm") &&
    !location.pathname.includes("/order/payment") &&
    !location.pathname.includes("/order/success") &&
    !location.pathname.includes("/profile") && (
      <footer className="footer">
        <Container className="footer-wrapper">
          <div className="info-list">
            <Link to={"/"}>
              <img src={logo} alt="logo" />
            </Link>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
              itaque cum quis facere, reprehenderit illum temporibus obcaecati
              magni ipsa blanditiis?
            </p>
          </div>
          <div className="info-list">
            <h3>Contact</h3>
            <ul>
              <li>
                <a href={"tel:+8801788228533"}>Dhaka, Bangladesh</a>
              </li>
              <li>
                <a href={"tel:+8801788228533"}>+88 01788-228533</a>
              </li>
              <li>
                <a href={"mailto:pbilash64@gmail.com"}>pbilash64@gmail.com</a>
              </li>
            </ul>
          </div>

          <div className="info-list">
            <h3>Follow Me</h3>
            <ul>
              <li>
                <Link to={"https://www.linkedin.com/in/bilash-prosad/"}>
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link to={"https://github.com/bilashProshad"}>Github</Link>
              </li>
              <li>
                <Link to={"https://www.facebook.com/bilash.proshad"}>
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
          <div className="info-list">
            <h3>Download</h3>
            <ul>
              <li>
                <Link to={"https://www.linkedin.com/in/bilash-prosad/"}>
                  <img src={appstore} alt="app store" />
                </Link>
              </li>
              <li>
                <Link to={"https://github.com/bilashProshad"}>
                  <img src={playstore} alt="app store" />
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </footer>
    )
  );
};

export default Footer;
