// src/pages/Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // Google login

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false); // toggle between signup & login
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/signup", form);
      setMessage(res.data.message);
      setForm({ name: "", email: "", password: "" });
      setIsLogin(true); // signup successful → show login form
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email: form.email,
        password: form.password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setMessage("Login successful!");
        navigate("/"); // redirect home
      } else {
        setMessage(res.data.message || "Login failed");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  // Handle Google Login Success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      // Normally send token to backend for verification
      localStorage.setItem("google_token", token);
      setMessage("Google login successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage("Google login failed!");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{isLogin ? "Login" : "Signup"}</h2>
      {message && <div className="alert alert-info">{message}</div>}

      {!isLogin ? (
        // Signup Form
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Signup
          </button>
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => setIsLogin(true)}
            >
              Login here
            </span>
          </p>
        </form>
      ) : (
        // Login Form
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
          <div className="text-center mt-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setMessage("Google login failed!")}
            />
          </div>
          <p className="mt-3 text-center">
            Don’t have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => setIsLogin(false)}
            >
              Signup here
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Signup;
