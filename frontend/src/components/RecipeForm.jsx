/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeForm = ({ formData, setFormData, sendData, isCreate }) => {
  const [validationError, setValidationError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const validateFields = (values) => {
    const errors = {};
    const urlReg = /^http[^?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim;
    if (!values.imgUrl) {
      errors.imgUrlErr = "This Field Can't Be Empty";
    }
    if (!urlReg.test(values.imgUrl) && values.imgUrl) {
      errors.imgUrlErr = "Invalid Image URL";
    }
    if (!values.name.trim()) {
      errors.nameErr = "This Field Can't Be Empty";
    }
    if (!values.instructions.trim()) {
      errors.instErr = "This Field Can't Be Empty";
    }
    if (!values.ingredients.length) {
      errors.ingredsErr = "This Field Can't Be Empty";
    }
    if (!values.desc.trim()) {
      errors.descErr = "This Field Can't Be Empty";
    }
    return errors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ingredients") {
      const ingreds = value.split(",");
      setFormData({ ...formData, [name]: ingreds });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  useEffect(() => {
    if (Object.keys(validationError).length === 0 && isSubmit) {
      sendData();
      console.log("Good");
    } else {
      console.log(validationError);
    }
  }, [validationError, isSubmit]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(validateFields(formData));
    setIsSubmit(true);
  };
  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="form w-full md:w-[85%] mx-0 border-none shadow-none"
    >
      <label htmlFor="name" className="label">
        Recipe Name
      </label>
      <input
        type="text"
        name="name"
        placeholder="Enter Recipe Name"
        className={`input ${
          validationError.nameErr && "border-[#f00] ring-2 ring-[#ff0000ab]"
        }`}
        value={formData.name}
        onChange={handleChange}
      />
      <span className="err">{validationError.nameErr}</span>
      <label htmlFor="desc" className="label">
        What Is This Recipe?
      </label>
      <input
        type="text"
        name="desc"
        placeholder="Descirbe The Recipe"
        className={`input ${
          validationError.descErr && "border-[#f00] ring-2 ring-[#ff0000ab]"
        }`}
        value={formData.desc}
        onChange={handleChange}
      />
      <span className="err">{validationError.descErr}</span>
      <label htmlFor="imgUrl" className="label">
        Show Us An Image Of This Recipe
      </label>
      <input
        type="text"
        name="imgUrl"
        className={`input ${
          validationError.imgUrlErr && "border-[#f00] ring-2 ring-[#ff0000ab]"
        }`}
        placeholder="eg: https://google.com/food.png"
        value={formData.imgUrl}
        onChange={handleChange}
      />
      <span className="err">{validationError.imgUrlErr}</span>

      <label htmlFor="ingredients" className="label">
        Ingreditents
      </label>
      <textarea
        type="text"
        name="ingredients"
        placeholder="eg: salt, meat, peper, water"
        className={`h-[100px] input resize-none ${
          validationError.ingredsErr && "border-[#f00] ring-2 ring-[#ff0000ab]"
        }`}
        value={formData.ingredients.join(",")}
        onChange={handleChange}
      ></textarea>
      <span className="err">{validationError.ingredsErr}</span>
      <label htmlFor="instructions" className="label">
        How To Make This Recipe
      </label>
      <textarea
        type="text"
        name="instructions"
        placeholder="Enter Recipe Steps"
        className={`h-[200px] input resize-none  ${
          validationError.instErr && "border-[#f00] ring-2 ring-[#ff0000ab]"
        }`}
        value={formData.instructions}
        onChange={handleChange}
      ></textarea>
      <span className="err">{validationError.instErr}</span>
      <div className="flex gap-4 items-center justify-between">
        <button type="submit" className="submit w-fit rounded-md">
          {isCreate ? "Create Recipe" : "Update Recipe"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="submit bg-gray-400 hover:bg-gray-400 w-fit rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
