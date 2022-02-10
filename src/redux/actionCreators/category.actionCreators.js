import {
	FETCH_CATEGORY_FAILURE,
	FETCH_CATEGORY_REQUEST,
	FETCH_CATEGORY_SUCCESS,
	ADD_NEW_CATEGORY_FAILURE,
	ADD_NEW_CATEGORY_REQUEST,
	ADD_NEW_CATEGORY_SUCCESS,
} from "../actionTypes/categoryConstants";

export const fetchCategoryRequest = () => {
	return {
		type: FETCH_CATEGORY_REQUEST,
	};
};

export const fetchCategorySuccess = (categories) => {
	return {
		type: FETCH_CATEGORY_SUCCESS,
		payload: { categories },
	};
};

export const fetchCategoryFailure = (errorMsg) => {
	return {
		type: FETCH_CATEGORY_FAILURE,
		payload: { error: errorMsg },
	};
};

export const addNewCategoryRequest = () => {
	return {
		type: ADD_NEW_CATEGORY_REQUEST,
	};
};

export const addNewCategorySuccess = (category) => {
	return {
		type: ADD_NEW_CATEGORY_SUCCESS,
		payload: { category },
	};
};

export const addNewCategoryFailure = (errorMsg) => {
	return {
		type: ADD_NEW_CATEGORY_FAILURE,
		payload: errorMsg,
	};
};
