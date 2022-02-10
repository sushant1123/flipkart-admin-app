import {
	SIGNUP_FAILURE,
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
} from "../actionTypes/userConstants";

export const signupRequest = () => {
	return {
		type: SIGNUP_REQUEST,
	};
};

export const signupSuccess = (message) => {
	return {
		type: SIGNUP_SUCCESS,
		payload: { message },
	};
};

export const signupFailure = (errorMsg) => {
	return {
		type: SIGNUP_FAILURE,
		payload: { error: errorMsg },
	};
};
