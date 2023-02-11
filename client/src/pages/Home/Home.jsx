import "./Home.scss";
import Container from "../../components/Container/Container";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";

const Home = () => {
  return (
    <Container className={`home`}>
      <Banner />
      <Categories />
      <FeaturedProducts />
    </Container>
  );
};

export default Home;
