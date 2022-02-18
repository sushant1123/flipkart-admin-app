import {
	ADD_PRODUCT_REQUEST,
	ADD_PRODUCT_SUCCESS,
	ADD_PRODUCT_FAILURE,
	GET_ALL_PRODUCTS_REQUEST,
	GET_ALL_PRODUCTS_SUCCESS,
	GET_ALL_PRODUCTS_FAILURE,
	DELETE_PRODUCT_BY_ID_FAILURE,
	DELETE_PRODUCT_BY_ID_REQUEST,
	DELETE_PRODUCT_BY_ID_SUCCESS,
} from "../actionTypes/productConstants";

export const addNewProductRequest = () => {
	return {
		type: ADD_PRODUCT_REQUEST,
	};
};

export const addNewProductSuccess = () => {
	return {
		type: ADD_PRODUCT_SUCCESS,
	};
};

export const addNewProductFailure = (errorMsg) => {
	return {
		type: ADD_PRODUCT_FAILURE,
		payload: { error: errorMsg },
	};
};

export const getAllProductsRequest = () => {
	return {
		type: GET_ALL_PRODUCTS_REQUEST,
	};
};

export const getAllProductsSuccess = (products) => {
	return {
		type: GET_ALL_PRODUCTS_SUCCESS,
		payload: { products },
	};
};

export const getAllProductsFailure = (error) => {
	return {
		type: GET_ALL_PRODUCTS_FAILURE,
		payload: { error },
	};
};

export const deleteProductByIdRequest = () => {
	return {
		type: DELETE_PRODUCT_BY_ID_REQUEST,
	};
};

export const deleteProductByIdSuccess = () => {
	return {
		type: DELETE_PRODUCT_BY_ID_SUCCESS,
	};
};

export const deleteProductByIdFailure = (error) => {
	return {
		type: DELETE_PRODUCT_BY_ID_FAILURE,
		payload: { error },
	};
};
