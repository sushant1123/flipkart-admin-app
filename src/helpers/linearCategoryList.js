// recursive call to get all the categories
const linearCategoriesList = (categories, categoryArr = []) => {
	for (let category of categories) {
		categoryArr.push({
			name: category.name,
			value: category._id,
			parentId: category.parentId,
			type: category.type,
		});
		if (category.subCategories.length) {
			linearCategoriesList(category.subCategories, categoryArr);
		}
	}

	return categoryArr;
};

export default linearCategoriesList;
