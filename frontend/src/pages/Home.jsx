import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const getAllrecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllrecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("username")]);

  return (
    <section className="section-container">
      <h2 className="text-4xl font-bold my-6 text-orange-600">All Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            name={recipe.name}
            desc={recipe.desc}
            imgSrc={recipe.imgUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
