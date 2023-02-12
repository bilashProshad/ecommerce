import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Products from './pages/Products/Products'
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products /> } />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
