import {
	GET_CUSTOMER_ORDER_FAILURE,
	GET_CUSTOMER_ORDER_REQUEST,
	GET_CUSTOMER_ORDER_SUCCESS,
	UPDATE_CUSTOMER_ORDER_FAILURE,
	UPDATE_CUSTOMER_ORDER_REQUEST,
	UPDATE_CUSTOMER_ORDER_SUCCESS,
} from "../actionTypes/orderConstants";

export const getCustomerOrderRequest = () => {
	return {
		type: GET_CUSTOMER_ORDER_REQUEST,
	};
};
export const getCustomerOrderSuccess = (orders) => {
	return {
		type: GET_CUSTOMER_ORDER_SUCCESS,
		payload: { orders },
	};
};

export const getCustomerOrderFailure = (error) => {
	return {
		type: GET_CUSTOMER_ORDER_FAILURE,
		payload: { error },
	};
};

export const updateCustomerOrderRequest = () => {
	return {
		type: UPDATE_CUSTOMER_ORDER_REQUEST,
	};
};
export const updateCustomerOrderSuccess = (orders) => {
	return {
		type: UPDATE_CUSTOMER_ORDER_SUCCESS,
		payload: { orders },
	};
};
export const updateCustomerOrderFailure = (error) => {
	return {
		type: UPDATE_CUSTOMER_ORDER_FAILURE,
		payload: { error },
	};
};
