import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
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

  // Check if the token exists in localStorage
  const token = localStorage.getItem("userInfo");

  const hideNavbarFooter =
    location.pathname === "/login" || location.pathname === "/signup";

  // Protect routes that require login (e.g., cart) and redirect if not authenticated
  const ProtectedRoute = ({ element }) => {
    return token ? element : <Navigate to="/login" />;
  };

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/product/:id" element={<ProtectedRoute element={<Product />} />} />
        {/* Protect Cart Route */}
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
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
