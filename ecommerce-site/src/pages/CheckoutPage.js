// src/pages/CheckoutPage.js
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "",
    transactionId: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    cardHolder: "",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.email || !form.address || !form.paymentMethod) {
      alert("Please fill all required fields");
      return;
    }

    if (form.paymentMethod === "Card") {
      if (!form.cardNumber || !form.cardExpiry || !form.cardCVV || !form.cardHolder) {
        alert("Please fill all card details");
        return;
      }
    } else if (form.paymentMethod !== "COD" && !form.transactionId) {
      alert("Please enter transaction ID for the selected payment method");
      return;
    }

    const paymentInfo =
      form.paymentMethod === "Card"
        ? {
            method: form.paymentMethod,
            cardNumber: form.cardNumber,
            cardExpiry: form.cardExpiry,
            cardCVV: form.cardCVV,
            cardHolder: form.cardHolder,
          }
        : { method: form.paymentMethod, transactionId: form.transactionId };

    // Generate unique order number
    const orderNumber = `#${Math.floor(100000 + Math.random() * 900000)}`;

    const orderData = {
      customer: {
        name: form.name,
        email: form.email,
        address: form.address,
      },
      cart,
      total,
      payment: paymentInfo,
      orderNumber,
      createdAt: new Date(),
    };

    try {
      const token = localStorage.getItem("token"); // user login er por token save hobe

      if (!token) {
        alert("Please login before placing an order.");
        navigate("/login");
        return;
      }

      // Send order with JWT token
      const response = await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        clearCart();
        navigate("/success", { state: { order: orderData } });
      } else {
        alert("Error placing order!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error! Check backend connection.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Checkout</h2>
      <div className="row g-4">
        {/* Cart Summary */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Your Cart</h5>
            </div>
            <div className="card-body">
              {cart.map((item) => (
                <div key={item.id} className="d-flex justify-content-between mb-3 border-bottom pb-2">
                  <div>
                    <strong>{item.name}</strong>
                    <p className="mb-0 text-muted">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                  <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="d-flex justify-content-between mt-3 pt-2 border-top">
                <h5>Total</h5>
                <h5 className="text-success">${total.toFixed(2)}</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Customer & Payment Form */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Customer & Payment Info</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea className="form-control" name="address" value={form.address} onChange={handleChange} rows="3" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  <select className="form-select" name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                    <option value="">Select Payment Method</option>
                    <option value="Bkash">Bkash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Card">Card</option>
                    <option value="COD">Cash on Delivery</option>
                  </select>
                </div>

                {form.paymentMethod && form.paymentMethod !== "COD" && form.paymentMethod !== "Card" && (
                  <div className="mb-3">
                    <label className="form-label">Transaction ID</label>
                    <input type="text" className="form-control" name="transactionId" value={form.transactionId} onChange={handleChange} />
                  </div>
                )}

                {form.paymentMethod === "Card" && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Card Number</label>
                      <input type="text" className="form-control" name="cardNumber" value={form.cardNumber} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Expiry Date</label>
                      <input type="text" className="form-control" name="cardExpiry" value={form.cardExpiry} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">CVV</label>
                      <input type="text" className="form-control" name="cardCVV" value={form.cardCVV} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Cardholder Name</label>
                      <input type="text" className="form-control" name="cardHolder" value={form.cardHolder} onChange={handleChange} />
                    </div>
                  </>
                )}

                <button type="submit" className="btn btn-success w-100 mt-3">
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
