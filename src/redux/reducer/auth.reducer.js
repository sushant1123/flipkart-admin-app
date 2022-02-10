import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_FAILURE,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
} from "../actionTypes/authConstants";

const initialState = {
	token: "",
	user: {
		firstName: "",
		lastName: "",
		email: "",
		profilePic: "",
	},
	authenticate: false,
	authenticating: false,
	error: null,
	message: "",
	loading: false,
};

const authReducer = (state = initialState, action) => {
	console.log(action);

	switch (action.type) {
		case LOGIN_REQUEST:
			state = { ...state, loading: true, authenticating: true };
			break;
		case LOGIN_SUCCESS:
			state = {
				...state,
				authenticating: false,
				user: action.payload.user,
				token: action.payload.token,
				authenticate: true,
				loading: false,
			};
			break;

		case LOGOUT_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;

		case LOGOUT_SUCCESS:
			state = {
				...initialState,
				message: action.payload.message,
			};
			break;

		case LOGOUT_FAILURE:
			state = {
				...state,
				error: action.payload.error,
				loading: false,
			};
			break;

		default:
			state = { ...state };
			break;
	}
	return state;
};

export default authReducer;
