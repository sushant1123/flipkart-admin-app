import {
	CREATE_PAGE_FAILURE,
	CREATE_PAGE_REQUEST,
	CREATE_PAGE_SUCCESS,
} from "../actionTypes/pageConstants";

export const createPageRequest = () => {
	return {
		type: CREATE_PAGE_REQUEST,
	};
};

export const createPageSuccess = (page) => {
	return {
		type: CREATE_PAGE_SUCCESS,
		payload: {
			page,
		},
	};
};

export const createPageFailure = (error) => {
	return {
		type: CREATE_PAGE_FAILURE,
		payload: { error },
	};
};
