import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/login",
      { email, password },
      { withCredentials: true }
    );
    console.log(response.data); // Check token and message
    if (response.data.token) {
      Cookies.set("token", response.data.token, { secure: true });
      navigate("/home");
    }
  } catch (error) {
    alert(
      error.response?.data?.error || "Invalid credentials or server error."
    );
    console.error(error);
  }
};


  return (
    <div className="brutalist-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="brutalist-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="brutalist-input smooth-type"
            required
          />
          <label className="brutalist-label">Email</label>
        </div>
        <div className="brutalist-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="brutalist-input smooth-type"
            required
          />
          <label className="brutalist-label">Password</label>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
