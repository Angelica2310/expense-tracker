import { Navigate } from "react-router-dom";
import { useSignUp } from "../context/SignupContext";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("currentUser");
  if (!isLoggedIn) {
    return <Navigate to="/log-in" replace />;
  }
  return children;
}
