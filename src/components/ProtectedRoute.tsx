import { useAuth } from "@/context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useAuth();
  const location = useLocation();
  if (authState.isLoading) {
    return <div>Loading...</div>;
  }
  if (!authState.isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
