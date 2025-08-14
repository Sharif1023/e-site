// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';



const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">E-Shop</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
        </ul>
        <form className="d-flex me-3">
          <input className="form-control me-2" type="search" placeholder="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <Link to="/cart"><FaShoppingCart size={25} /></Link>
      </div>
    </nav>
  );
};

export default Navbar;
