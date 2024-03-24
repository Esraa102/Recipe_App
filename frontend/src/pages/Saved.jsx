/* eslint-disable react-hooks/exhaustive-deps */
import RecipeCard from "../components/RecipeCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";
const Saved = () => {
  const [saved, setSaved] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const userId = useGetUserID();
  const getSaved = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/recipes/savedRecipes",
        { userId },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer" + " " + cookies.access_token,
          },
        }
      );
      setSaved(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSaved();
  }, []);
  return (
    <section className="section-container">
      <h1 className="text-4xl font-bold my-6 text-orange-600">Saved Recipes</h1>
      {!saved.length && (
        <p className="text-gray-500 text-center">No Recipes Saved</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {saved.map((recipe) => (
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

export default Saved;
