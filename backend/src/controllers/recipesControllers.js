import asyncHandler from "express-async-handler";
import { RecipeModel } from "../models/recipeModel.js";
import { UserModel } from "../models/userModel.js";

//@route api/recipes/ GET
//@des get all recipes
//@access public
const getAllRecipes = asyncHandler(async (req, res) => {
  const recipes = await RecipeModel.find({});
  res.status(200).json(recipes);
});

//@route api/recipes/:id GET
//@des get a recipe
//@access public
const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await RecipeModel.findById(req.params.id);
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe Does Not Found");
  }
  res.status(200).send(recipe);
});

//@route api/recipes/create POST
//@des create a recipe
//@access private
const createRecipe = asyncHandler(async (req, res) => {
  const { name, desc, instructions, ingredients, imgUrl } = req.body;
  if (name && desc && instructions && ingredients && imgUrl) {
    const newRecipe = await RecipeModel.create({
      name,
      desc,
      instructions,
      ingredients,
      imgUrl,
      user_owner: req.user.id,
    });
    if (!newRecipe) {
      throw new Error();
    }
    res.status(201).json(newRecipe);
  } else {
    res.status(400);
    throw new Error("All Inputs Are Madentory");
  }
});

//@route api/recipes/:id PUT
//@des update a recipe
//@access private
const updateRecipe = asyncHandler(async (req, res) => {
  const isExist = await RecipeModel.findById(req.params.id);
  if (!isExist) {
    res.status(404);
    throw new Error("Recipe Does Not Found");
  }
  if (isExist.user_owner.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User Is Not Allowed To Update This Recipe");
  } else {
    const updated = await RecipeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      res.status(400);
      throw new Error("Invalid Inputs");
    }
    res.status(200).send(updated);
  }
});

//@route api/recipes/:id DELETE
//@des delete a recipe
//@access private
const deleteRecipe = asyncHandler(async (req, res) => {
  const isExist = await RecipeModel.findById(req.params.id);
  if (!isExist) {
    res.status(404);
    throw new Error("Recipe Does Not Found");
  }
  if (isExist.user_owner.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User Is Not Allowed To Update This Recipe");
  } else {
    await RecipeModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ status: "Deleted" });
  }
});

//@route api/recipes/ PUT
//@des save a recipe
//@access private
const savedRecipe = asyncHandler(async (req, res) => {
  const { recipeId, userId } = req.body;
  const recipe = await RecipeModel.findById(recipeId);
  const user = await UserModel.findById(userId);
  if (!user) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  user.saved.push(recipe);
  await user.save();
  res.status(200).send({ saved: user.saved, savedRecipe: recipe });
});

const getSavedRecipes = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.body.userId);
  if (!user) {
    res.status(401);
    throw new Error("User Is Unathorized");
  }
  const savedRecipes = await RecipeModel.find({
    _id: { $in: user.saved },
  });
  res.status(200).send(savedRecipes);
});
export {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  savedRecipe,
  getSavedRecipes,
};
