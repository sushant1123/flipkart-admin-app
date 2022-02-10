import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component }) => {
	const token = window.localStorage.getItem("token");

	return token ? component : <Navigate to={"/signin"} />;
};

export default PrivateRoute;
