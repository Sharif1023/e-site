// src/pages/SuccessPage.js
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FaCheckCircle, FaTruck, FaShoppingCart } from "react-icons/fa";

const SuccessPage = () => {
  const { state } = useLocation();
  const { order } = state || {};

  if (!order)
    return (
      <div className="container my-5 text-center">
        <h3>No order found.</h3>
        <Link to="/cart" className="btn btn-primary mt-3">Back to Cart</Link>
      </div>
    );

  // Generate a random order number
  const orderNumber = `#${Math.floor(100000 + Math.random() * 900000)}`;

  // Estimated delivery (5-7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const formattedDelivery = deliveryDate.toLocaleDateString();

  return (
    <div className="container my-5">
      {/* Success Banner */}
      <div className="text-center mb-5">
        <FaCheckCircle size={80} className="text-success mb-3" />
        <h2 className="text-success">Thank You! Your Order is Confirmed</h2>
        <p className="lead">Order <strong>{orderNumber}</strong> has been successfully placed.</p>
      </div>

      <div className="row g-4">
        {/* Customer & Payment Info */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white d-flex align-items-center">
              <FaShoppingCart className="me-2" />
              <h5 className="mb-0">Customer & Payment Info</h5>
            </div>
            <div className="card-body">
              <p><strong>Name:</strong> {order.customer.name}</p>
              <p><strong>Email:</strong> {order.customer.email}</p>
              <p><strong>Address:</strong> {order.customer.address}</p>
              <p><strong>Payment Method:</strong> {order.payment.method}</p>
              {order.payment.transactionId && <p><strong>Transaction ID:</strong> {order.payment.transactionId}</p>}
              {order.payment.cardNumber && (
                <>
                  <p><strong>Card Number:</strong> **** **** **** {order.payment.cardNumber.slice(-4)}</p>
                  <p><strong>Card Holder:</strong> {order.payment.cardHolder}</p>
                </>
              )}
              <p><strong>Estimated Delivery:</strong> {formattedDelivery}</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex align-items-center">
              <FaTruck className="me-2" />
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-group mb-3">
                {order.cart.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between">
                    <span>{item.name} x {item.quantity}</span>
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span className="text-success">${order.total.toFixed(2)}</span>
                </li>
              </ul>
              <Link to="/cart" className="btn btn-primary w-100 mb-2">Back to Cart</Link>
              <Link to="/" className="btn btn-outline-success w-100">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
