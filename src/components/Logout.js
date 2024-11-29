import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token"); // Remove the JWT from cookies
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
}

export default Logout;
