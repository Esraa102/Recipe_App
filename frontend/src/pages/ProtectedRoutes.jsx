import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
const ProtectedRoutes = () => {
  const [cookies] = useCookies(["access_token"]);
  return cookies.access_token !== "" ? (
    <Outlet />
  ) : (
    <Navigate to={"/register"} />
  );
};

export default ProtectedRoutes;
