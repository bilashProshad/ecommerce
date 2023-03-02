import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/User/Login/Login";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductCategory from "./pages/ProductCategory/ProductCategory";
import Profile from "./pages/User/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Orders from "./pages/Orders/Orders";
import UpdateProfile from "./pages/User/UpdateProfile/UpdateProfile";
import UpdatePassword from "./pages/User/UpdatePassword/UpdatePassword";
import UpdateAddress from "./pages/User/UpdateAddress/UpdateAddress";
import AllProducts from "./pages/Admin/AllProducts/AllProducts";
import AdminOrder from "./pages/Admin/Orders/Orders";
import AllUsers from "./pages/Admin/Users/Users";
import AllReviews from "./pages/Admin/Reviews/Reviews";
import CreateProduct from "./pages/Admin/CreateProduct/CreateProduct";
import toast, { Toaster } from "react-hot-toast";
import store from "./redux/store";
import { useEffect, useState } from "react";
import { loadUser } from "./redux/actions/authAction";
import PrivateRoute from "./components/Route/PrivateRoute";
import AdminRoute from "./components/Route/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory/CreateCategory";
import AllCategory from "./pages/Admin/AllCategory/AllCategory";
import { useSelector } from "react-redux";
import UpdateProduct from "./pages/Admin/UpdateProduct/UpdateProduct";
import ShippingAddress from "./pages/OrderProducts/ShippingAddress/ShippingAddress";
import Confirm from "./pages/OrderProducts/Confirm/Confirm";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./pages/OrderProducts/Payment/Payment";

function App() {
  const { items, totalQuantity } = useSelector((state) => state.cart);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const server = process.env.REACT_APP_SERVER;
    const { data } = await axios.get(`${server}/api/v1/payment/stripeapikey`, {
      withCredentials: true,
    });

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  useEffect(() => {
    const cartItems = { items, totalQuantity };
    localStorage.setItem("obCartItem", JSON.stringify(cartItems));
  }, [items, totalQuantity]);

  return (
    <BrowserRouter>
      {/* {location.pathname.includes('/admin')} */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/category/:id" element={<ProductCategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<UpdateProfile />} />
          <Route path="/profile/password/change" element={<UpdatePassword />} />
          <Route path="/profile/address/edit" element={<UpdateAddress />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/shipping" element={<ShippingAddress />} />
          <Route path="/order/confirm" element={<Confirm />} />
          <Route
            path="/order/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
        </Route>

        {/* ---------------- Admin Routes ---------------- */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<AllProducts />} />
          <Route path="/admin/products/new" element={<CreateProduct />} />
          <Route path="/admin/products/:id" element={<UpdateProduct />} />
          <Route path="/admin/categories" element={<AllCategory />} />
          <Route path="/admin/categories/new" element={<CreateCategory />} />
          <Route path="/admin/orders" element={<AdminOrder />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/reviews" element={<AllReviews />} />
        </Route>
      </Routes>

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
