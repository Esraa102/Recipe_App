import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  savedRecipe,
  updateRecipe,
  getSavedRecipes,
} from "../controllers/recipesControllers.js";
import { validateToken } from "../middleware/validateToken.js";
const router = express.Router();

//Private Routes
router.post("/", validateToken, createRecipe); //private
router.post("/savedRecipes", validateToken, getSavedRecipes); //private
router.put("/savedRecipes", validateToken, savedRecipe); //private
router.put("/:id", validateToken, updateRecipe); // private
router.delete("/:id", validateToken, deleteRecipe); //private

//Public Routes
router.route("/").get(getAllRecipes); //public
router.get("/:id", getRecipeById); //public
export { router as recipesRouter };
