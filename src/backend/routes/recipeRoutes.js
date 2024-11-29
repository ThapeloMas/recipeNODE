const express = require("express");
const { authMiddleware, roleMiddleware } = require("../middleware/auth");
const Recipe = require("../models/Recipe");

const router = express.Router();

// Create a recipe (Only admin)
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { title, ingredients, instructions, category } = req.body;
      const recipe = new Recipe({
        title,
        ingredients,
        instructions,
        category,
        createdBy: req.user.id,
      });
      await recipe.save();
      res.status(201).json({ message: "Recipe created", recipe });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get all recipes (Public access)
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit a recipe (Only admin)
router.put(
  "/edit/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedRecipe = await Recipe.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updatedRecipe)
        return res.status(404).json({ error: "Recipe not found" });
      res
        .status(200)
        .json({ message: "Recipe updated", recipe: updatedRecipe });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Delete a recipe (Only admin)
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRecipe = await Recipe.findByIdAndDelete(id);
      if (!deletedRecipe)
        return res.status(404).json({ error: "Recipe not found" });
      res
        .status(200)
        .json({ message: "Recipe deleted", recipe: deletedRecipe });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get user-specific recipes (User access only)
router.get(
  "/my-recipes",
  authMiddleware,
  roleMiddleware(["user"]),
  async (req, res) => {
    try {
      const recipes = await Recipe.find({ createdBy: req.user.id });
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
