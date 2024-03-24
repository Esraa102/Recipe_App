import { Route, Routes } from "react-router-dom";
import RegisterUser from "./pages/RegisterUser";
import LoginUser from "./pages/LoginUser";
import Home from "./pages/Home";
import Header from "./components/Header";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Saved from "./pages/Saved";
import CreateRecipe from "./pages/CreateRecipe";
import Footer from "./components/Footer";
import Recipe from "./pages/Recipe";
import UpdateRecipe from "./pages/UpdateRecipe";
function App() {
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/update/:id" element={<UpdateRecipe />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/saved" element={<Saved />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
