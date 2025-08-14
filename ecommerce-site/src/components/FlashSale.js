// src/components/FlashSale.js
import React from 'react';
import ProductCard from './ProductCard';

const FlashSale = ({ products }) => {
  return (
    <div className="my-5">
      <h3>Today's Flash Sale</h3>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {products.map((p) => (
          <div key={p.id} className="col">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
