import "./Home.scss";
import Container from "../../components/Container/Container";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../redux/actions/categoryAction";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { clearCategoriesError } from "../../redux/slices/categoriesSlice";
import Loading from "../../components/Loading/Loading";
import { clearAllProductError } from "../../redux/slices/productSlice";
import { getAllProduct } from "../../redux/actions/productAction";

const Home = () => {
  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useSelector((state) => state.categories);

  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());

    dispatch(getAllProduct("limit=8"));
  }, [dispatch]);

  useEffect(() => {
    if (errorCategories) {
      toast.error(errorCategories);
      dispatch(clearCategoriesError());
    }

    if (errorProducts) {
      toast.error(errorProducts);
      dispatch(clearAllProductError());
    }
  }, [dispatch, errorCategories, errorProducts]);

  return (
    <Container className={`home`}>
      {loadingCategories || loadingProducts ? (
        <Loading />
      ) : (
        <>
          <Banner />
          <Categories data={categories} />
          <FeaturedProducts products={products} />
        </>
      )}
    </Container>
  );
};

export default Home;
