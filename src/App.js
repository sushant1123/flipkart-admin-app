import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//actions
import {
	isUserLoggedIn,
	getAllCategories,
	getInitialData,
} from "./redux/actionCreators/actions";

//css
import "./App.css";

//custom components
import PrivateRoute from "./components/HOC/PrivateRoute";
import Home from "./containers/home/Home";
import Signin from "./containers/signin/Signin";
import Signup from "./containers/signup/Signup";
import Products from "./containers/product/Products";
import Orders from "./containers/order/Orders";
import Category from "./containers/category/Category";
import NewPage from "./containers/NewPage/NewPage";

const App = () => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		//if user is not logged in then call dispatch
		if (!auth.authenticate) {
			dispatch(isUserLoggedIn());
		}
		dispatch(getInitialData());
		dispatch(getAllCategories());
	}, []);

	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={<PrivateRoute component={<Home />} />}
				/>
				<Route
					path="/page"
					element={<PrivateRoute component={<NewPage />} />}
				/>
				<Route
					path="/products"
					element={<PrivateRoute component={<Products />} />}
				/>
				<Route
					path="/orders"
					element={<PrivateRoute component={<Orders />} />}
				/>
				<Route
					path="/categories"
					element={<PrivateRoute component={<Category />} />}
				/>
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</div>
	);
};

export default App;
