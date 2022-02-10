import {
	ADD_PRODUCT_REQUEST,
	ADD_PRODUCT_SUCCESS,
	ADD_PRODUCT_FAILURE,
	GET_ALL_PRODUCTS_REQUEST,
	GET_ALL_PRODUCTS_SUCCESS,
	GET_ALL_PRODUCTS_FAILURE,
} from "../actionTypes/productConstants";

export const addNewProductRequest = () => {
	return {
		type: ADD_PRODUCT_REQUEST,
	};
};
export const addNewProductSuccess = (product) => {
	return {
		type: ADD_PRODUCT_SUCCESS,
		payload: product,
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
		payload: products,
	};
};

export const getAllProductsFailure = (errorMsg) => {
	return {
		type: GET_ALL_PRODUCTS_FAILURE,
		payload: { error: errorMsg },
	};
};
