import { LOGIN_REQUEST } from "../actionTypes/authConstants";

const initialState = {};

const authReducer = (state = initialState, action) => {
	console.log(action);
	switch (action.type) {
		case LOGIN_REQUEST:
			state = { ...state, ...action.payload };
			break;

		default:
			state = { ...state };
			break;
	}
	return state;
};

export default authReducer;
