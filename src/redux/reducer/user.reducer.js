import {
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE,
} from "../actionTypes/userConstants";

const initialUserState = {
	loading: false,
	message: "",
	error: null,
};

const userReducer = (state = initialUserState, action) => {
	// console.log(action);

	switch (action.type) {
		case SIGNUP_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;

		case SIGNUP_SUCCESS:
			state = {
				...state,
				loading: false,
				message: action.payload.message,
				// error: null,
			};
			break;

		case SIGNUP_FAILURE:
			state = {
				...state,
				loading: false,
				message: "",
				error: action.payload.error,
			};
			break;

		default:
			state = { ...state };
			break;
	}
	return state;
};

export default userReducer;
