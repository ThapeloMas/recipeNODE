
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Account() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setEmail(user.email);
      // Fetch password if stored (assuming a GET endpoint)
      axios.get(`http://localhost:5000/users/${user.id}`).then((response) => {
        setPassword(response.data.password);
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await axios.put(`http://localhost:5000/users/${user.id}`, { password });
      alert("Profile updated successfully");
      navigate("/home"); // Redirect to the home page after updating the profile
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <h2>Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} readOnly />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Account;
