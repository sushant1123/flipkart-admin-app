import {
	FETCH_CATEGORY_FAILURE,
	FETCH_CATEGORY_SUCCESS,
	FETCH_CATEGORY_REQUEST,
	ADD_NEW_CATEGORY_REQUEST,
	ADD_NEW_CATEGORY_SUCCESS,
	ADD_NEW_CATEGORY_FAILURE,
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
	let nestedCategories = [];
	for (let cat of categories) {
		if (cat._id === parentId) {
			nestedCategories.push({
				...cat,
				subCategories:
					cat.subCategories && cat.subCategories.length
						? addNewCategoryToTheNestedCategory(
								parentId,
								[
									...cat.subCategories,
									{
										_id: newCategory._id,
										name: newCategory.name,
										slug: newCategory.slug,
										parentId: newCategory.parentId,
										subCategories:
											newCategory.subCategories,
									},
								],
								newCategory
						  )
						: [],
			});
		} else {
			nestedCategories.push({
				...cat,
				subCategories:
					cat.subCategories && cat.subCategories.length
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
			let updatedNestedCategoryList;
			if (category.pareneId) {
				updatedNestedCategoryList = addNewCategoryToTheNestedCategory(
					category.parentId,
					state.categories,
					category
				);
			} else {
				updatedNestedCategoryList = [
					...state.categories,
					{
						_id: category._id,
						name: category.name,
						slug: category.slug,
						parentId: category.parentId,
						subCategories: [],
					},
				];
			}

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

		default:
			break;
	}

	return state;
};

export default categoryReducer;
