// PrivateRoute.js
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
  const { loggedIn } = useContext(AuthContext);

  return loggedIn ? <Navigate to="/blog" /> : <Outlet />;
};

export default PrivateRoute;
