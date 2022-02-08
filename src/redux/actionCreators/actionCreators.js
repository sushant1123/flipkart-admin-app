import { LOGIN_REQUEST } from "../actionTypes/authConstants";

export const login = (user) => {
	// alert(JSON.stringify(user));
	// console.log(user);
	return async (dispatch) => {
		dispatch(loginRequest(user));
	};
};

export const loginRequest = (user) => {
	return {
		type: LOGIN_REQUEST,
		payload: { ...user },
	};
};
