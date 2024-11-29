import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Addrecipe.css"; 

function AddRecipe() {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    category: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    image: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setRecipe({ ...recipe, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post("http://localhost:5000/api/recipes", {
        ...recipe,
        userId: user.id,
        ingredients: recipe.ingredients.split(",").map((item) => item.trim()),
      });
      navigate("/home");
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div className="input-container">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Recipe Name"
          onChange={handleChange}
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          onChange={handleChange}
          required
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <input
          name="prepTime"
          placeholder="Preparation Time"
          onChange={handleChange}
          required
        />
        <input
          name="cookTime"
          placeholder="Cooking Time"
          onChange={handleChange}
          required
        />
        <input
          name="servings"
          placeholder="Servings"
          onChange={handleChange}
          required
        />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;
