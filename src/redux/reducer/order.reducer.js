import {
	GET_CUSTOMER_ORDER_FAILURE,
	GET_CUSTOMER_ORDER_REQUEST,
	GET_CUSTOMER_ORDER_SUCCESS,
} from "../actionTypes/orderConstants";

const initialOrderState = {
	loading: false,
	orders: [],
	error: null,
};

const orderReducer = (state = initialOrderState, action) => {
	switch (action.type) {
		case GET_CUSTOMER_ORDER_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;

		case GET_CUSTOMER_ORDER_SUCCESS:
			state = {
				...state,
				loading: false,
				orders: action.payload.orders,
			};
			break;

		case GET_CUSTOMER_ORDER_FAILURE:
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
export default orderReducer;
