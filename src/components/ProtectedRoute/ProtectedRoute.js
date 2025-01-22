import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  // Redirect to "/" if not logged in, otherwise render the children
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
