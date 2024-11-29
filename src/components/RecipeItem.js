import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Recipe.css";



function RecipeItem({ recipe, onDelete }) {
  const handleDelete = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (recipe.userId !== user.id) {
        alert("You don't have permission to delete this recipe");
        return;
      }
      await axios.delete(`http://localhost:5000/recipes/${recipe.id}`);
      onDelete();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="card">
      {recipe.image && <img src={recipe.image} alt={recipe.name} />}
      <div className="card__content">
        <h3 className="card__title">{recipe.name}</h3>
        <p className="card__description">Category: {recipe.category}</p>
        <p className="card__description">Preparation Time: {recipe.prepTime}</p>
        <p className="card__description">Cooking Time: {recipe.cookTime}</p>
        <p className="card__description">Servings: {recipe.servings}</p>
        <Link to={`/edit-recipe/${recipe.id}`}>
          Edit
        </Link>

        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default RecipeItem;
