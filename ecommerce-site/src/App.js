import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Login from "./pages/Login";
import AllProductsPage from './pages/AllProductsPage'; // ✅ use AllProductsPage that includes Sidebar
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";

import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        {/* ✅ All Products with Sidebar */}
        <Route path="/all-products" element={<AllProductsPage />} />
        <Route path="/category/:category/:subcategory" element={<AllProductsPage />} />

        {/* Product Details */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Cart */}
        <Route path="/cart" element={<CartPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />

      </Routes>
    </Router>
  );
}

export default App;
