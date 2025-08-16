// src/pages/AllProducts.js
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { SearchContext } from '../context/SearchContext';
import { allProducts } from './AllProductsData'; // separate file for products


const AllProducts = () => {
  const { category, subcategory } = useParams();
  const { searchTerm } = useContext(SearchContext);

  // Start with all products
  let filteredProducts = allProducts;

  // Filter by category/subcategory if in URL
  if (category && subcategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === category && p.subcategory === subcategory
    );
  }

  // Filter by search term
  if (searchTerm) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="container my-5">
      <h2>
        {category && subcategory
          ? `${category} → ${subcategory}`
          : searchTerm
          ? `Search Results for "${searchTerm}"`
          : "All Products"}
      </h2>
      <div className="row row-cols-1 row-cols-md-3 g-4 my-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
