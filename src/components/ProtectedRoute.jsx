import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  // If authentication state is known and the user is not authenticated, redirect to login
  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />; // Using `replace` to prevent storing the login redirect in history
  }

  // While authentication is being determined, you can return null, a spinner, or loading component if needed
  return children; // Render the children (protected content) if authenticated
};

export default ProtectedRoute;
