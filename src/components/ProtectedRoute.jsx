import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


export function ProtectedRoute({ children, role }) {
  const { user, isLoading } = useContext(AuthContext);


  if (isLoading) {
    return <h3>Loading...</h3>;
  }

 
  if (!user) {
    return <Navigate to="/login" />;
  }

  
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  // 4. All good — render the protected page
  return children;
}