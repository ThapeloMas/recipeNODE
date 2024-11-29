import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RecipeList from "./RecipeList";
import SearchBar from "./SearchBar";

import { MdOutlineAccountCircle } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";


function Home() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.id) {
        const response = await axios.get(
          `http://localhost:5000/recipes?userId=${user.id}`
        );
        setRecipes(response.data);
        setFilteredRecipes(response.data);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSearch = (keyword) => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <h2>Recipe List</h2>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/add-recipe">
        <IoAddCircleSharp color="black" size= {50} />
      </Link>
      <br></br>
      <br></br>
      <Link to="/account">
        <MdOutlineAccountCircle color="black" size={50} />
      </Link>

      <SearchBar onSearch={handleSearch} />
      <br></br>
      <br></br>
      <RecipeList recipes={filteredRecipes} onDelete={fetchRecipes} />
    </div>
  );
}

export default Home;
