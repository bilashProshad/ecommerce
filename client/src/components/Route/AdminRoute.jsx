import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { isAuth, user } = useSelector((state) => state.auth);

  return isAuth && user.role === "admin" ? <Outlet /> : <Navigate to={`/`} />;
};

export default AdminRoute;
