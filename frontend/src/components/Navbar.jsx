import { useCookies } from "react-cookie";
import { NavLink, useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const Navbar = ({ style }) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logOut = () => {
    setCookies("access_token", "");
    localStorage.removeItem("user_id");
    console.log("Deleted");
    navigate("/login");
  };
  return (
    <ul className={style}>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) => `link ${isActive && "text-orange-600"}`}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/saved"}
          className={({ isActive }) => `link ${isActive && "text-orange-600"}`}
        >
          Saved Recipes
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/create-recipe"}
          className={({ isActive }) => `link ${isActive && "text-orange-600"}`}
        >
          Add Recipe
        </NavLink>
      </li>
      {cookies.access_token ? (
        <li>
          <button onClick={logOut} className="link">
            Log Out
          </button>
        </li>
      ) : (
        <li>
          <NavLink
            to={"/register"}
            className={({ isActive }) =>
              `link ${isActive && "text-orange-600"}`
            }
          >
            Sign Up
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
