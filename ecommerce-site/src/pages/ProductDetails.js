// src/pages/ProductDetails.js
import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { CartContext } from "../context/CartContext";
import { allProducts } from "./AllProductsData"; // ✅ fix import


const ProductDetails = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === parseInt(id));

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  if (!product) return <h2>Product not found</h2>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Left: Product images */}
        <div className="col-md-6">
          <img
            src={mainImage}
            alt={product.name}
            className="img-fluid border rounded mb-3"
          />
          <div className="d-flex gap-2">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumbnail"
                className="img-thumbnail"
                style={{ width: "80px", height: "80px", cursor: "pointer" }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product details */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-success">${product.price}</h4>

          {/* Quantity selector */}
          <div className="d-flex align-items-center my-3">
            <label className="me-2">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="form-control"
              style={{ width: "80px" }}
            />
          </div>

          {/* Buttons */}
          <button className="btn btn-primary me-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="btn btn-success">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
