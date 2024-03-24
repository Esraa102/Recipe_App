import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";
const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [cookies] = useCookies(["access_token"]);

  const loggedUser = useGetUserID();
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const recipe = await axios.get(
          `http://localhost:5000/api/recipes/${id}`
        );

        setRecipe(recipe.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRecipe();
  }, [id]);
  const saveRecipe = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/recipes/savedRecipes",
        {
          recipeId: recipe._id,
          userId: loggedUser,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer" + " " + cookies.access_token,
          },
        }
      );
      alert("Saved");
      navigate("/saved");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteRecipe = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/recipes/${id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer" + " " + cookies.access_token,
          },
        }
      );
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!recipe) return "Loading...";

  return (
    <>
      <img
        src={
          recipe?.imgUrl.endsWith(".webpack") || recipe?.imgUrl.endsWith(".wZ")
            ? "/public/assets/placeholder.jpg"
            : recipe?.imgUrl
        }
        alt="recipe-img"
        className="w-full h-[500px] object-cover mt-[90px]"
      />
      <section className="section-container pt-0 capitalize">
        <div className="flex items-center gap-6  my-8 flex-wrap justify-between">
          <h2 className="text-4xl font-bold text-orange-600">{recipe?.name}</h2>
          {cookies.access_token && (
            <button
              onClick={saveRecipe}
              type="button"
              className={`submit w-fit rounded-md `}
            >
              Save
            </button>
          )}
        </div>
        <p className="text-2xl font-bold my-4 ">What Is This Recipe?</p>
        <p className="text-lg text-gray-600 mb-4">{recipe?.desc}</p>
        <p className="text-2xl font-bold my-4 ">Ingredients</p>
        <p className="mb-4 flex items-center justify-center lg:justify-start gap-3 flex-wrap text-[16px]">
          {recipe?.ingredients.map((item, index) => (
            <span
              key={index}
              className="py-1 text-center px-3 bg-gray-300 rounded-md "
            >
              {item}
            </span>
          ))}
        </p>
        <p className="text-2xl font-bold my-4 ">How To Make This Recipe</p>
        <p className="text-lg text-gray-600 mb-4">{recipe?.instructions}</p>
        {loggedUser === recipe?.user_owner && (
          <div className="flex items-center gap-4 flex-wrap mt-6">
            <Link to={`/update/${id}`} className="submit rounded-md w-fit">
              Update Recipe
            </Link>
            <button
              onClick={deleteRecipe}
              type="button"
              className="submit w-fit rounded-md hover:bg-red-900 bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Recipe;
