import "./Home.scss";
import Container from "../../components/Container/Container";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import Products from "../../components/Products/Products";

const Home = () => {
  return (
    <Container className={`home`}>
      <Banner />
      <Categories />
      <Products />
    </Container>
  );
};

export default Home;
