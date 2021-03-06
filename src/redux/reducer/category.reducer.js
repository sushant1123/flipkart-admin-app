import {
	FETCH_CATEGORY_FAILURE,
	FETCH_CATEGORY_SUCCESS,
	FETCH_CATEGORY_REQUEST,
	ADD_NEW_CATEGORY_REQUEST,
	ADD_NEW_CATEGORY_SUCCESS,
	ADD_NEW_CATEGORY_FAILURE,
	UPDATE_CATEGORIES_REQUEST,
	UPDATE_CATEGORIES_SUCCESS,
	UPDATE_CATEGORIES_FAILURE,
	DELETE_CATEGORIES_FAILURE,
	DELETE_CATEGORIES_REQUEST,
	DELETE_CATEGORIES_SUCCESS,
} from "../actionTypes/categoryConstants";

const initialCategoryState = {
	loading: false,
	categories: [],
	error: null,
};

const addNewCategoryToTheNestedCategory = (
	parentId,
	categories,
	newCategory
) => {
	if (parentId == undefined) {
		return [
			...categories,
			{
				_id: newCategory._id,
				name: newCategory.name,
				slug: newCategory.slug,
				type: newCategory.type,
				subCategories: [],
			},
		];
	}

	let nestedCategories = [];
	for (let cat of categories) {
		if (cat._id === parentId) {
			const newCat = {
				_id: newCategory._id,
				name: newCategory.name,
				slug: newCategory.slug,
				type: newCategory.type,
				parentId: newCategory.parentId,
				subCategories: [],
			};

			nestedCategories.push({
				...cat,
				subCategories:
					cat.subCategories.length > 0
						? [...cat.subCategories, newCat]
						: [newCat],
			});
		} else {
			nestedCategories.push({
				...cat,
				subCategories: cat.subCategories
					? addNewCategoryToTheNestedCategory(
							parentId,
							cat.subCategories,
							newCategory
					  )
					: [],
			});
		}
	}

	return nestedCategories;
};

const categoryReducer = (state = initialCategoryState, action) => {
	switch (action.type) {
		case FETCH_CATEGORY_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;

		case FETCH_CATEGORY_SUCCESS:
			state = {
				...state,
				loading: false,
				categories: action.payload.categories,
				error: null,
			};
			break;

		case FETCH_CATEGORY_FAILURE:
			state = {
				...state,
				loading: false,
				categories: [],
				error: action.payload,
			};
			break;

		case ADD_NEW_CATEGORY_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;

		case ADD_NEW_CATEGORY_SUCCESS:
			const { category } = action.payload;
			const updatedNestedCategoryList = addNewCategoryToTheNestedCategory(
				category.parentId,
				state.categories,
				category
			);

			state = {
				...state,
				categories: updatedNestedCategoryList,
				loading: false,
			};
			break;

		case ADD_NEW_CATEGORY_FAILURE:
			state = {
				...state,
				loading: false,
				categories: state.categories,
				error: action.payload,
			};
			break;

		case UPDATE_CATEGORIES_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;

		case UPDATE_CATEGORIES_SUCCESS:
			state = {
				...state,
				loading: false,
			};
			break;

		case UPDATE_CATEGORIES_FAILURE:
			state = {
				...state,
				loading: false,
				error: action.payload.error,
			};
			break;

		case DELETE_CATEGORIES_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;

		case DELETE_CATEGORIES_SUCCESS:
			state = {
				...state,
				loading: false,
			};
			break;

		case DELETE_CATEGORIES_FAILURE:
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

export default categoryReducer;
