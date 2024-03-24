/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Form = ({ isRegister }) => {
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["access_token"]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };
  const validateValues = (values) => {
    const errors = {};
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (isRegister) {
      if (!values.username.trim()) {
        errors.username = "Username Can't Be Empty";
      }
      if (values.rePassword !== values.password) {
        errors.rePassword = "Password And Re-Password Do Not Match";
      }
    }
    if (!emailRegex.test(values.email)) {
      errors.email = "Invalid Email";
    }
    if (values.password.length < 8) {
      errors.password = "Password Should be At Least 8 Characters";
    }
    return errors;
  };
  const sendDataToServer = async () => {
    if (isRegister) {
      try {
        const newUser = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }
        );
        if (!newUser) throw new Error("Unscuessfull User Creating");
        login();

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        login();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const login = async () => {
    try {
      const loggedUesr = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      setCookie("access_token", loggedUesr.data.token);
      localStorage.setItem("user_id", loggedUesr.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(validationErrors).length === 0 && isSubmit) {
      sendDataToServer();
      console.log(formData);
    } else {
      console.log(validationErrors);
      console.log("Went Wrong");
    }
  }, [validationErrors, isSubmit]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors(validateValues(formData));
    setIsSubmit(true);
  };

  return (
    <section>
      <form action="" onSubmit={handleSubmit} className="form">
        {isRegister && (
          <>
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={`input ${
                validationErrors.email &&
                "border-[#f00] ring-2 ring-[#ff0000ab]"
              }`}
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Your Username"
            />
            <span className="err">{validationErrors.username}</span>
          </>
        )}

        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className={`input ${
            validationErrors.email && "border-[#f00] ring-2 ring-[#ff0000ab]"
          }`}
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Your Email"
        />
        <span className="err">{validationErrors.email}</span>
        <label htmlFor="pass" className="label">
          Password
        </label>
        <input
          type="password"
          id="pass"
          name="password"
          className={`input ${
            validationErrors.password && "border-[#f00] ring-2 ring-[#ff0000ab]"
          }`}
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Your Password"
        />
        <span className="err">{validationErrors.password}</span>
        {isRegister && (
          <>
            <label htmlFor="re-pass" className="label">
              Re-Password
            </label>
            <input
              type="password"
              id="re-pass"
              name="rePassword"
              className={`input ${
                validationErrors.rePassword &&
                "border-[#f00] ring-2 ring-[#ff0000ab]"
              }`}
              required
              value={formData.rePassword}
              onChange={handleChange}
              placeholder="Enter Password Again"
            />
          </>
        )}
        <span className="err">{validationErrors.rePassword}</span>
        <button type="submit" className="submit">
          {isRegister ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <p className="text-center mt-3">
        {isRegister ? "Already Have an account?" : "Don't Have An Account?"}
        <Link
          to={`${isRegister ? "/login" : "/register"}`}
          className="hover:text-orange-600  transition font-bold"
        >
          {isRegister ? "Sign In" : "Create One"}
        </Link>
      </p>
    </section>
  );
};

export default Form;
