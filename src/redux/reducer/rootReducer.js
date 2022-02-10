import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import orderReducer from "./product.reducer";

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	category: categoryReducer,
	product: productReducer,
	order: orderReducer,
});

export default rootReducer;
