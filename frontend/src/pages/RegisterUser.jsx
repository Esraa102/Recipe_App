import Form from "../components/Form";
const RegisterUser = () => {
  return (
    <section className="section-container">
      <h1 className="head">Sign Up</h1>
      <p className="text-center text-gray-400 text-lg">
        Enter Your Account Details
      </p>
      <Form isRegister={true} />
    </section>
  );
};

export default RegisterUser;
