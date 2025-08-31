import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import FlashSale from '../components/FlashSale';
import { useNavigate } from 'react-router-dom';

const featuredProducts = [
  { id: 1, name: "Men's Shirt", price: 20, image: "/images/shirt1.jpg", category: "Men's Fashion", subcategory: "Cloths" },
  { id: 2, name: "Men's Shoes", price: 40, image: "/images/shirt2.webp", category: "Men's Fashion", subcategory: "Shoes" },
  { id: 3, name: "Women's Dress", price: 35, image: "/images/shirt3.jpg", category: "Women's Fashion", subcategory: "Cloths" },
  { id: 4, name: "Men's Watch", price: 50, image: "/images/shirt2.webp", category: "Men's Fashion", subcategory: "Watches" },
  { id: 5, name: "Vitamin C", price: 10, image: "/images/shirt1.jpg", category: "Medicine", subcategory: "Vitamins" },
];

const flashSaleProducts = [
  { id: 6, name: "Flash Product 1", price: 15, image: "/images/shirt2.webp" },
  { id: 7, name: "Flash Product 2", price: 25, image: "/images/shirt3.jpg" },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredProducts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleShopNow = () => {
    navigate('/all-products');
  };

  const currentProduct = featuredProducts[currentIndex];

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="col-md-10">
          <div 
            className="featured-product-section position-relative my-5 p-3 border rounded d-flex align-items-center"
            style={{ minHeight: '250px' }}
          >
            <div className="row w-100 align-items-center">
              <div className="col-md-4">
                <img src={currentProduct.image} alt={currentProduct.name} className="img-fluid rounded" />
              </div>
              <div className="col-md-6">
                <h4>{currentProduct.name}</h4>
                <p>Category: {currentProduct.category} / {currentProduct.subcategory}</p>
                <h5>${currentProduct.price}</h5>
              </div>
              <div className="col-md-2 text-center d-flex flex-column justify-content-end">
                <button 
                  className="btn btn-primary mt-auto" 
                  style={{ position: 'sticky', bottom: '10px' }}
                  onClick={handleShopNow}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Flash Sale Section */}
          <FlashSale products={flashSaleProducts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
