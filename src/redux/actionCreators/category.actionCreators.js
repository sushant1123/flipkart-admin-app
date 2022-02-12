import {
	FETCH_CATEGORY_FAILURE,
	FETCH_CATEGORY_REQUEST,
	FETCH_CATEGORY_SUCCESS,
	ADD_NEW_CATEGORY_FAILURE,
	ADD_NEW_CATEGORY_REQUEST,
	ADD_NEW_CATEGORY_SUCCESS,
	UPDATE_CATEGORIES_FAILURE,
	UPDATE_CATEGORIES_SUCCESS,
	UPDATE_CATEGORIES_REQUEST,
	DELETE_CATEGORIES_FAILURE,
	DELETE_CATEGORIES_SUCCESS,
	DELETE_CATEGORIES_REQUEST,
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

//It will be very tricky to update the categorylist after after updating few items in the list,
//so we are dispatching the getAllCategories async-action only.

export const updateCategoriesRequest = () => {
	return {
		type: UPDATE_CATEGORIES_REQUEST,
	};
};

export const updateCategoriesSuccess = () => {
	return {
		type: UPDATE_CATEGORIES_SUCCESS,
	};
};

export const updateCategoriesFailure = (error) => {
	return {
		type: UPDATE_CATEGORIES_FAILURE,
		payload: { error },
	};
};

export const deleteCategoriesRequest = () => {
	return {
		type: DELETE_CATEGORIES_REQUEST,
	};
};

export const deleteCategoriesSuccess = () => {
	return {
		type: DELETE_CATEGORIES_SUCCESS,
	};
};

export const deleteCategoriesFailure = (error) => {
	return {
		type: DELETE_CATEGORIES_FAILURE,
		payload: { error },
	};
};
