import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import "./Addrecipe.css" // Import the CSS file

function EditRecipe() {
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
  const { id } = useParams();

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(`http://localhost:5000/api/recipes`);
      if (response.data.userId !== user.id) {
        alert("You don't have permission to edit this recipe");
        navigate("/home");
        return;
      }
      setRecipe({
        ...response.data,
        ingredients: response.data.ingredients.join(", "),
      });
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

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
      await axios.put(`http://localhost:5000/api/recipes`, {
        ...recipe,
        userId: user.id,
        ingredients: recipe.ingredients.split(",").map((item) => item.trim()),
      });
      navigate("/home");
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div className="input-container">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={recipe.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          required
        />
        <textarea
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          value={recipe.category}
          onChange={handleChange}
          required
        />
        <input
          name="prepTime"
          value={recipe.prepTime}
          onChange={handleChange}
          required
        />
        <input
          name="cookTime"
          value={recipe.cookTime}
          onChange={handleChange}
          required
        />
        <input
          name="servings"
          value={recipe.servings}
          onChange={handleChange}
          required
        />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}

export default EditRecipe;
