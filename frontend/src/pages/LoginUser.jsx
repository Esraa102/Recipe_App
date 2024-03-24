import Form from "../components/Form";
const LoginUser = () => {
  return (
    <section className="section-container">
      <h1 className="head">Sign In</h1>
      <p className="text-center text-gray-400 text-lg">
        Welcome Back! Enter Your Details
      </p>
      <Form isRegister={false} />
    </section>
  );
};

export default LoginUser;
