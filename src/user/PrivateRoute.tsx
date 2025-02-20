import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const location = useLocation();

  if (localStorage.getItem('authToken') ===null) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the protected element
  return element as React.ReactElement;
};

export default PrivateRoute;
