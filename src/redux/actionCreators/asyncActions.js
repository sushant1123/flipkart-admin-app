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
	updateCategoriesSuccess,
	updateCategoriesRequest,
	updateCategoriesFailure,
	deleteCategoriesRequest,
	deleteCategoriesSuccess,
	deleteCategoriesFailure,
} from "./category.actionCreators";

import axios from "../../helpers/axios";
// import {
// 	getAllInitialDataFailure,
// 	getAllInitialDataRequest,
// 	getAllInitialDataSuccess,
// } from "./initialData.actionCreators";

import {
	addNewProductFailure,
	addNewProductRequest,
	addNewProductSuccess,
	getAllProductsFailure,
	getAllProductsRequest,
	getAllProductsSuccess,
} from "./product.actionCreators";
import {
	createPageFailure,
	createPageRequest,
	createPageSuccess,
} from "./page.actionCreators";

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
	};
};

export const addNewCategory = (form) => {
	return async (dispatch) => {
		try {
			dispatch(addNewCategoryRequest());
			const res = await axios.post("/category/create", form);

			if (res.status === 201) {
				dispatch(addNewCategorySuccess(res.data.category));
			} else {
				dispatch(addNewCategoryFailure(res.data.error));
			}
		} catch (error) {
			console.log(error.response);
		}
	};
};

export const addNewProduct = (form) => {
	return async (dispatch) => {
		dispatch(addNewProductRequest());
		const res = await axios.post("/product/create", form);
		console.log(res);
		if (res.status === 201) {
			dispatch(addNewProductSuccess());
		} else {
			dispatch(addNewProductFailure(res.data.error));
		}
	};
};

export const getInitialData = () => {
	return async (dispatch) => {
		dispatch(fetchCategoryRequest());
		dispatch(getAllProductsRequest());
		const res = await axios.get("/initialdata");

		if (res.status === 200) {
			const { categories, products } = res.data;
			dispatch(fetchCategorySuccess(categories));
			dispatch(getAllProductsSuccess(products));
		} else {
			dispatch(fetchCategoryFailure(res.data.error));
			dispatch(getAllProductsFailure(res.data.error));
		}
	};
};

export const updateCategories = (form) => {
	return async (dispatch) => {
		dispatch(updateCategoriesRequest());
		const res = await axios.post("/category/update", form);

		console.log(res);
		if (res.status === 201) {
			dispatch(updateCategoriesSuccess());
			dispatch(getAllCategories());
		} else {
			// dispatch()
			const { error } = res.data;
			dispatch(updateCategoriesFailure(error));
		}
	};
};

export const deletedCategories = (ids) => {
	return async (dispatch) => {
		dispatch(deleteCategoriesRequest());
		const res = await axios.post("/category/delete", { payload: { ids } });

		console.log(res);
		if (res.status === 200) {
			dispatch(deleteCategoriesSuccess());
			dispatch(getAllCategories());
		} else {
			const { error } = res.data;
			dispatch(deleteCategoriesFailure(error));
		}
	};
};

export const createPage = (form) => {
	return async (dispatch) => {
		try {
			dispatch(createPageRequest());

			const res = await axios.post("/page/create", form);

			if (res.status === 201) {
				dispatch(createPageSuccess(res.data.page));
			} else {
				dispatch(createPageFailure(res.data.error));
			}
		} catch (error) {
			console.log(error);
		}
	};
};
