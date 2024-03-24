import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";

const Header = () => {
  const [miniNav, setMiniNav] = useState(false);

  return (
    <div className="fixed top-0 left-0 z-10 shadow bg-white text-white w-full">
      <div className="container mx-auto p-4 md:p-6 text-lg flex justify-between">
        <Link
          to="/"
          className="font-extrabold text-2xl uppercase text-orange-600
          flex items-center gap-2"
        >
          <img src="/public/assets/icon.jpg" width={45} height={45} />{" "}
          <span>Recipes</span>
        </Link>
        <Navbar style={"hidden md:flex gap-4"} />
        <div className=" md:hidden flex items-center">
          <button type="button" onClick={() => setMiniNav((prev) => !prev)}>
            <img src="/public/assets/bars.png" width={35} height={35} alt="" />
          </button>
          {miniNav && (
            <Navbar
              style={
                "flex flex-col p-4 bg-gray-300 fixed gap-4 z-10 right-0 rounded-sm top-[77px]"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
