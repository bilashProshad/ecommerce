import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/User/Login/Login";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
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
import { useEffect } from "react";
import { loadUser } from "./redux/actions/authAction";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      {/* {location.pathname.includes('/admin')} */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile/edit" element={<UpdateProfile />} />
        <Route path="/profile/password/change" element={<UpdatePassword />} />
        <Route path="/profile/address/edit" element={<UpdateAddress />} />

        {/* ---------------- Admin Routes ---------------- */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products/all" element={<AllProducts />} />
        <Route path="/admin/products/create" element={<CreateProduct />} />
        <Route path="/admin/orders" element={<AdminOrder />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/admin/reviews" element={<AllReviews />} />
      </Routes>

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
