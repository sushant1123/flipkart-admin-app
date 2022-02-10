import {
	GET_ALL_PRODUCTS_FAILURE,
	GET_ALL_PRODUCTS_REQUEST,
	GET_ALL_PRODUCTS_SUCCESS,
} from "../actionTypes/productConstants";

const initialProductsState = {
	products: [],
	error: null,
};

const productReducer = (state = initialProductsState, action) => {
	switch (action.type) {
		case GET_ALL_PRODUCTS_REQUEST:
			state = { ...state };
			break;

		case GET_ALL_PRODUCTS_SUCCESS:
			state = {
				...state,
				products: action.payload,
			};
			break;

		case GET_ALL_PRODUCTS_FAILURE:
			state = {
				...state,
				error: action.payload.error,
			};
			break;

		default:
			state = { ...state };
			break;
	}

	return state;
};

export default productReducer;
