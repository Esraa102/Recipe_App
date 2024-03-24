import { useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
const UpdateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    desc: "",
    ingredients: [],
    instructions: "",
    imgUrl: "",
  });
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getRecipe = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/recipes/${id}`
        );
        console.log(data);
        setRecipe({
          name: data.name,
          desc: data.desc,
          ingredients: data.ingredients,
          instructions: data.instructions,
          imgUrl: data.imgUrl,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getRecipe();
  }, [id]);

  const updateRecipe = async () => {
    try {
      const updated = await axios.put(
        `http://localhost:5000/api/recipes/${id}`,
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
      console.log(updated.data);
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="section-container">
      <h1 className="text-3xl font-bold my-6 capitalize">
        Update <span className="text-orange-600">[{recipe.name}]</span> Recipe
      </h1>
      <RecipeForm
        formData={recipe}
        setFormData={setRecipe}
        sendData={updateRecipe}
        isCreate={false}
      />
    </section>
  );
};

export default UpdateRecipe;
