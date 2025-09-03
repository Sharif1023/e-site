
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <SearchProvider>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <App />
      </GoogleOAuthProvider>
    </SearchProvider>
  </CartProvider>
);



