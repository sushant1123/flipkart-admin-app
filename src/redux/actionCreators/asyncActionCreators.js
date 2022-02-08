import { loginRequest } from "./actionCreators";

export const login = (user) => {
	return async (dispatch) => {
		dispatch(loginRequest(user));
	};
};
