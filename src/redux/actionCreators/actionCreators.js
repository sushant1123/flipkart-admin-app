import { LOGIN_REQUEST } from "../actionTypes/authConstants";

export const loginRequest = (user) => {
	return {
		type: LOGIN_REQUEST,
		payload: { ...user },
	};
};
