import { CREATE_PAGE_FAILURE, CREATE_PAGE_REQUEST, CREATE_PAGE_SUCCESS } from "../actionTypes/pageConstants";

const initialPageState = {
	loading: false,
	page: [],
	error: null,
};

const pageReducer = (state = initialPageState, action) => {
	switch (action.type) {
		case CREATE_PAGE_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;

		case CREATE_PAGE_SUCCESS:
			state = {
				...state,
				loading: false,
				// page: [action.payload.page],
				// error: null,
			};
			break;

		case CREATE_PAGE_FAILURE:
			state = {
				...state,
				loading: false,
				error: action.payload.error,
			};
			break;

		default:
			state = { ...state };
			break;
	}
	return state;
};

export default pageReducer;
