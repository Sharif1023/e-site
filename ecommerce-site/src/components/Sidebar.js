import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const categories = {
  "Men's Fashion": ["Cloths", "Shoes", "Watches"],
  "Women's Fashion": ["Cloths", "Shoes", "Bags"],
  "Medicine": ["Vitamins", "Painkillers", "Supplements"]
};

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const { category: selectedCategory, subcategory: selectedSubcategory } = useParams();

  const toggleCategory = (cat) => {
    setActiveCategory(activeCategory === cat ? null : cat);
  };

  return (
    <div className="bg-light p-3" style={{ minHeight: '100vh' }}>
      {Object.keys(categories).map((cat, i) => (
        <div key={i} className="mb-2">
          <h5 
            onClick={() => toggleCategory(cat)} 
            style={{ 
              cursor: 'pointer', 
              backgroundColor: activeCategory === cat ? '#e0e0e0' : 'transparent',
              padding: '5px 10px',
              borderRadius: '5px'
            }}
          >
            {cat}
          </h5>
          <ul 
            className="list-unstyled ms-3" 
            style={{ 
              maxHeight: activeCategory === cat ? '500px' : '0', 
              overflow: 'hidden', 
              transition: 'all 0.3s ease' 
            }}
          >
            {categories[cat].map((subcat, j) => (
              <li key={j} className="my-1">
                <Link 
                  to={`/category/${encodeURIComponent(cat)}/${encodeURIComponent(subcat)}`} 
                  className={`text-decoration-none px-2 py-1 d-block rounded ${
                    selectedCategory === cat && selectedSubcategory === subcat ? 'bg-primary text-white' : ''
                  }`}
                >
                  {subcat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
