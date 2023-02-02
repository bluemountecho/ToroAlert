import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  token,
  redirectPath,
  children,
  loginRoute = false,
  isApiKeyValidated,
  cryptoLoginRoute = false,
}) => {
  //console.log(token);
  if (isApiKeyValidated && cryptoLoginRoute)
    return <Navigate to={redirectPath} replace />;
  if (loginRoute && token) return <Navigate to={redirectPath} replace />;
  if (!token && !loginRoute) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
