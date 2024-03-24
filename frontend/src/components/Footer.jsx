import { Link } from "react-router-dom";

const Footer = () => {
  
  return (
    <footer className="bg-orange-800 text-white">
      <div className="section-container pt-10 flex justify-between gap-4 flex-col lg:flex-row ">
        <div>
          <Link to="/" className="text-4xl font-bold uppercase">
            Recipes
          </Link>
          <p className="w-full md:w-1/2 mt-4 text-gray-300">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
            similique nam minima in eos
          </p>
        </div>
        <div>
          <h2 className="text-white text-2xl font-bold">Links</h2>
          <ul className="flex flex-col mt-4 gap-4">
            <li>
              <Link to={"/"} className="footerLink">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/saved"} className="footerLink">
                Saved Recipes
              </Link>
            </li>
            <li>
              <Link to={"/create-recipe"} className="footerLink">
                Add Recipe
              </Link>
            </li>
            <li>
              <Link to={"/register"} className="footerLink">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-2xl font-bold">Other Links</h2>
          <ul className="flex flex-col  gap-4 mt-4">
            <li>
              <a href="#" className="footerLink">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="footerLink">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="footerLink">
                Our Team
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center border-t-[1px] border-gray-300 pt-6 pb-3">
        All Rights Reserved &copy; 2024
      </div>
    </footer>
  );
};

export default Footer;
