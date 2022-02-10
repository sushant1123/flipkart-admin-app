import {
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_FAILURE,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
} from "../actionTypes/authConstants";

export const loginRequest = () => {
	return {
		type: LOGIN_REQUEST,
	};
};

export const loginSuccess = (token, user) => {
	return {
		type: LOGIN_SUCCESS,
		payload: { token, user },
	};
};

export const loginFailure = (errorMsg) => {
	return {
		type: LOGIN_FAILURE,
		payload: { error: errorMsg },
	};
};

export const logoutSuccess = (message) => {
	return {
		type: LOGOUT_SUCCESS,
		payload: {
			message,
		},
	};
};

export const logoutRequest = () => {
	return {
		type: LOGOUT_REQUEST,
	};
};

export const logoutFailure = (errorMsg) => {
	return {
		type: LOGOUT_FAILURE,
		payload: { error: errorMsg },
	};
};
