// src/pages/AllProductsPage.js
import React from "react";
import Sidebar from "../components/Sidebar";
import AllProducts from "./AllProducts";

const AllProductsPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>

        {/* Products */}
        <div className="col-md-9">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
