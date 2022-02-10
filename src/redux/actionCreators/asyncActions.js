import {
	loginFailure,
	loginRequest,
	loginSuccess,
	logoutFailure,
	logoutRequest,
	logoutSuccess,
} from "./auth.actionCreators";

import {
	signupFailure,
	signupRequest,
	signupSuccess,
} from "./user.actionCreators";

import {
	fetchCategoryRequest,
	fetchCategorySuccess,
	fetchCategoryFailure,
	addNewCategoryRequest,
	addNewCategorySuccess,
	addNewCategoryFailure,
} from "./category.actionCreators";

import axios from "../../helpers/axios";

export const login = (user) => {
	return async (dispatch) => {
		//dispatching login request action
		dispatch(loginRequest());
		//make a call to backend
		const res = await axios.post("/admin/signin", user);

		if (res.status === 200) {
			const { token, user } = res.data;

			//storing date in localstorage
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));

			//dispatching success action
			dispatch(loginSuccess(token, user));
		} else if (res.status === 400) {
			//dispatching failure action
			dispatch(loginFailure(res.data.error));
		}
	};
};

export const signup = (user) => {
	return async (dispatch) => {
		//dispatching signup request action
		dispatch(signupRequest());

		//make a call to backend
		const res = await axios.post("/admin/signup", { ...user });
		// console.log(res.data);

		if (res.status === 201) {
			const { message } = res.data;

			//dispatching signup success action
			dispatch(signupSuccess(message));
		} else if (res.status === 400) {
			//dispatching failure action
			dispatch(signupFailure(res.data.error));
		}
	};
};

export const isUserLoggedIn = () => {
	return async (dispatch) => {
		const token = localStorage.getItem("token");
		if (token) {
			const user = JSON.parse(localStorage.getItem("user"));
			dispatch(loginSuccess(token, user));
		} else {
			dispatch(loginFailure("failed to login"));
		}
	};
};

export const signout = () => {
	return async (dispatch) => {
		dispatch(logoutRequest());
		const res = await axios.post("/admin/signout");

		if (res.status === 200) {
			//remove our data from localstorage
			localStorage.removeItem("token");
			localStorage.removeItem("user");

			//dispatch an action creator
			dispatch(logoutSuccess(res.data.message));
		} else {
			dispatch(logoutFailure(res.data.error));
		}
	};
};

export const getAllCategories = () => {
	return async (dispatch) => {
		dispatch(fetchCategoryRequest());
		let res = await axios.get("/category/getCategories");
		if (res.status === 200) {
			dispatch(fetchCategorySuccess(res.data.categories));
		} else {
			dispatch(fetchCategoryFailure(res.data.error));
		}
		console.log(res.data.categories);
	};
};

export const addNewCategory = (form) => {
	return async (dispatch) => {
		dispatch(addNewCategoryRequest());
		const res = await axios.post("/category/create", form);

		if (res.status === 201) {
			dispatch(addNewCategorySuccess(res.data.category));
		} else {
			dispatch(addNewCategoryFailure(res.data.error));
		}
		// console.log(res);
	};
};
