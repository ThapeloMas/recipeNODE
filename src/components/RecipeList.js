import React from "react";
import RecipeItem from "./RecipeItem";
import "./Recipe.css";

function RecipeList({ recipes, onDelete }) {
  return (
    <div className="cards">
      {recipes.map((recipe) =>  (
        <RecipeItem key={recipe.id} recipe={recipe} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default RecipeList;
