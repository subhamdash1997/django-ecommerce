import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Cart from "./pages/cart";
import Product from "./pages/product";

const App = () => {
  const location = useLocation();

  const hideNavbarFooter =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
