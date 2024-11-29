
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";
import Account from "./components/Account";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>


            
          }
        />
           <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          <Route path="/account" element={<Account />} />

      </Routes>
    </Router>
  );
}

export default App;
