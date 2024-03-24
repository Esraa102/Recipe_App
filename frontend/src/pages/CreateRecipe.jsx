import { useState } from "react";
import axios from "axios";
import RecipeForm from "../components/RecipeForm";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    desc: "",
    instructions: "",
    ingredients: [],
    imgUrl: "",
  });
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const createRecipe = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/recipes",
        {
          name: recipe.name,
          desc: recipe.desc,
          instructions: recipe.instructions,
          ingredients: recipe.ingredients,
          imgUrl: recipe.imgUrl,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer" + " " + cookies.access_token,
          },
        }
      );
      if (!response) throw new Error("Unsccessful Creating");
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section-container">
      <h1 className="text-3xl font-bold my-6 text-orange-600">
        Create A Recipe
      </h1>
      <RecipeForm
        formData={recipe}
        setFormData={setRecipe}
        sendData={createRecipe}
        isCreate={true}
      />
    </section>
  );
};

export default CreateRecipe;
