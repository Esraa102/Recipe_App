/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const RecipeCard = ({ id, imgSrc, name, desc }) => {
  return (
    <Link
      to={`/recipe/${id}`}
      className="block border overflow-hidden rounded-md shadow-md hover:scale-105 duration-300 ease-in-out"
    >
      <img
        src={
          imgSrc.endsWith(".webpack") || imgSrc.endsWith(".wZ")
            ? "/public/assets/placeholder.jpg"
            : imgSrc
        }
        alt="img"
        className="w-full object-cover h-[200px]"
      />
      <p className="my-4 text-xl font-bold px-4">{name}</p>
      <p className="text-lg text-gray-600 px-4 pb-4">{desc}</p>
    </Link>
  );
};
export default RecipeCard;
