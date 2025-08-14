// src/pages/AllProducts.js
import React from 'react';
import ProductCard from '../components/ProductCard';

const allProducts = [
  { id: 1, name: "Men's Shirt", price: 20, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Women's Dress", price: 35, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Vitamin C", price: 10, image: "https://via.placeholder.com/150" },
  { id: 4, name: "Men's Watch", price: 50, image: "https://via.placeholder.com/150" },
  { id: 5, name: "Flash Product 1", price: 15, image: "https://via.placeholder.com/150" },
  { id: 6, name: "Flash Product 2", price: 25, image: "https://via.placeholder.com/150" },
];

const AllProducts = () => {
  return (
    <div className="container my-5">
      <h2>All Products</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4 my-3">
        {allProducts.map(product => (
          <div key={product.id} className="col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
