import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", {
        email,
        password,
      });
      alert("Registration successful. Please log in.");
      navigate("/home");
    } catch (error) {
      alert("Registration failed. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="brutalist-container">
      <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
