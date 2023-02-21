import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return isAuth ? <Navigate to={`/`} /> : <Outlet />;
};

export default PublicRoute;
