import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import CheckboxTree from "react-checkbox-tree";
import { useSelector, useDispatch } from "react-redux";

//async actions
import {
	addNewCategory,
	deletedCategories,
	updateCategories,
} from "../../redux/actionCreators/actions";

//icons
import { IoChevronForwardOutline, IoChevronDownOutline } from "react-icons/io5";
import {
	IoIosAddCircle,
	IoIosBody,
	IoIosCheckbox,
	IoIosCheckboxOutline,
	IoIosTrash,
} from "react-icons/io";
import { BiCheckbox } from "react-icons/bi";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";

//css
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import "./category.css";

//modals & custom components
import Layout from "../../components/layouts/Layout";
import UpdateCategoryModalComponent from "./pageLevelComponents/UpdateCategoriesModalComponent";
import AddCategoryModalComponent from "./pageLevelComponents/AddCategoryModalComponent";
import DeleteCategoryModalComponent from "./pageLevelComponents/DeleteCategoryModalComponent";

const Category = () => {
	const category = useSelector((state) => state.category);
	const dispatch = useDispatch();

	const [show, setShow] = useState(false);
	const [newCategory, setNewCategory] = useState("");
	const [newCategoryParentId, setNewCategoryParentId] = useState(undefined);
	const [newCategoryPicture, setNewCategoryPicture] = useState("");
	const [checked, setChecked] = useState([]);
	const [expanded, setExpanded] = useState([]);
	const [checkedArray, setCheckedArray] = useState([]);
	const [expandedArray, setExpandedArray] = useState([]);
	const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
	const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		if (!category.loading) {
			setShow(false);
		}
	}, [category.loading]);

	// recursive call to get the nested categories
	const renderAllNestedCategories = (categories) => {
		let nestedCategoryList = [];

		for (let category of categories) {
			nestedCategoryList.push({
				label: category.name,
				value: category._id,
				children:
					category.subCategories.length > 0 &&
					renderAllNestedCategories(category.subCategories),
			});
		}

		return nestedCategoryList;
	};

	// recursive call to get all the categories
	const createAllCategoriesList = (categories, categoryArr = []) => {
		for (let category of categories) {
			categoryArr.push({
				name: category.name,
				value: category._id,
				parentId: category.parentId,
				type: category.type,
			});
			if (category.subCategories.length) {
				createAllCategoriesList(category.subCategories, categoryArr);
			}
		}

		return categoryArr;
	};

	const handleCategoryPictureUpload = (e) => {
		setNewCategoryPicture(e.target.files[0]);
	};

	const handleAddNewCategoryRequest = () => {
		const form = new FormData();

		if (newCategory === "") {
			alert("Name is required");
			return;
		}
		form.append("name", newCategory);

		//we are checking for parentId = null in the backend, so no need to check here
		if (newCategoryParentId) {
			form.append("parentId", newCategoryParentId);
		}
		form.append("categoryPicture", newCategoryPicture);

		console.log(newCategory, newCategoryParentId, newCategoryPicture);
		dispatch(addNewCategory(form));

		setNewCategory("");
		setNewCategoryParentId(undefined);
		setNewCategoryPicture("");

		// handleClose();
	};

	const handleUpdateCategoryRequest = () => {
		const form = new FormData();

		expandedArray.forEach((item, index) => {
			form.append("_id", item.value);
			form.append("name", item.name);
			form.append("parentId", item.parentId ? item.parentId : "");
			form.append("type", item.type);
		});

		checkedArray.forEach((item, index) => {
			form.append("_id", item.value);
			form.append("name", item.name);
			form.append("parentId", item.parentId ? item.parentId : "");
			form.append("type", item.type);
		});

		dispatch(updateCategories(form));
		//.then((success) => {
		// 	if (success) {
		// 		dispatch(getAllCategories());
		// 		setUpdateCategoryModal(false);
		// 	}
		// });

		setUpdateCategoryModal(false);
	};

	const handleDeleteCategoryConfirmedRequest = () => {
		const checkedIdsArray = checkedArray.map((item, index) => ({
			_id: item.value,
		}));

		const idsArray = [...checkedIdsArray];
		if (idsArray.length) {
			dispatch(deletedCategories(idsArray));
		} else {
			alert("please select some category to delete");
		}
		setDeleteCategoryModal(false);
	};

	const handleDeleteCategoryCancelledRequest = () => {
		alert("cancelled");
		setDeleteCategoryModal(false);
	};

	const showUpdateCategoryHandlerModal = () => {
		setUpdateCategoryModal(true);
		updateCheckedAndExpandedArrays();
	};

	const showDeleteCategoryHandlerModal = () => {
		setDeleteCategoryModal(true);
		updateCheckedAndExpandedArrays();
	};

	const updateCheckedAndExpandedArrays = () => {
		const allCategories = createAllCategoriesList(category.categories);
		const checkedArray = [];
		const expandedArray = [];

		checked.length > 0 &&
			checked.forEach((categoryId, index) => {
				// console.log(categoryId, index);
				const category = allCategories.find(
					(category, index) => category.value === categoryId
				);

				category && checkedArray.push(category);
			});
		setCheckedArray(checkedArray);

		expanded.length > 0 &&
			expanded.forEach((categoryId, index) => {
				// console.log(categoryId, index);
				const category = allCategories.find(
					(category, index) => category.value === categoryId
				);

				category && expandedArray.push(category);
			});

		setExpandedArray(expandedArray);

		// console.log({
		// 	checked,
		// 	expanded,
		// 	allCategories,
		// 	checkedArray,
		// 	expandedArray,
		// });
	};

	const handleCategoryInput = (key, value, index, type) => {
		if (type === "checked") {
			const updatedCheckedArray = checkedArray.map((item, _index) =>
				index === _index ? { ...item, [key]: value } : item
			);
			setCheckedArray(updatedCheckedArray);
		} else if (type === "expanded") {
			const updatedExpandedArray = expandedArray.map((item, _index) =>
				index === _index ? { ...item, [key]: value } : item
			);
			setExpandedArray(updatedExpandedArray);
		}
	};

	const categoryList = createAllCategoriesList(category.categories);

	return (
		<Layout sidebar>
			<Container>
				<Row style={{ marginBottom: "12px" }}>
					<Col md={12}>
						<div>
							<h3>Category</h3>
						</div>
					</Col>
				</Row>
				<Row>
					{/* Render nested list: Although not necessary rn. */}
					<CheckboxTree
						nodes={renderAllNestedCategories(category.categories)}
						checked={checked}
						expanded={expanded}
						onCheck={(checked) => setChecked(checked)}
						onExpand={(expanded) => setExpanded(expanded)}
						icons={{
							check: <IoIosCheckbox />,
							uncheck: <BiCheckbox />,
							halfCheck: <IoIosCheckboxOutline />,
							expandClose: <IoChevronForwardOutline />,
							expandOpen: <IoChevronDownOutline />,
							expandAll: <FaFolderOpen />,
							collapseAll: <FaFolderOpen />,
							parentClose: <FaFolder />,
							parentOpen: <FaFolderOpen />,
							leaf: <IoIosBody />,
						}}
					/>
				</Row>
				<Row style={{ margin: "12px 0 20px" }}>
					<Col md={{ span: 3, offset: 1 }}>
						<Button variant="primary" onClick={handleShow}>
							<IoIosAddCircle />
							&nbsp; Add
						</Button>
					</Col>
					<Col md={{ span: 3, offset: 1 }}>
						<Button
							variant="danger"
							onClick={showDeleteCategoryHandlerModal}
						>
							<IoIosTrash />
							&nbsp; Delete
						</Button>
					</Col>
					<Col md={{ span: 3, offset: 1 }}>
						<Button
							variant="warning"
							onClick={showUpdateCategoryHandlerModal}
						>
							<GrUpdate />
							&nbsp;Edit
						</Button>
					</Col>
				</Row>
			</Container>

			{/* Add Category modal */}
			<AddCategoryModalComponent
				show={show}
				handleClose={handleClose}
				modalTitle="Add New Category"
				handleClick={handleAddNewCategoryRequest}
				newCategory={newCategory}
				setNewCategory={setNewCategory}
				newCategoryParentId={newCategoryParentId}
				setNewCategoryParentId={setNewCategoryParentId}
				handleCategoryPictureUpload={handleCategoryPictureUpload}
				btnName="Add Category"
				categoryList={categoryList}
			/>

			{/* Update Category Modal */}
			<UpdateCategoryModalComponent
				show={updateCategoryModal}
				handleClose={() => setUpdateCategoryModal(false)}
				modalTitle="Update Category"
				handleClick={handleUpdateCategoryRequest}
				btnName="Update"
				size="lg"
				expandedArray={expandedArray}
				checkedArray={checkedArray}
				handleCategoryInput={handleCategoryInput}
				categoryList={categoryList}
			/>

			{/* delete Category Modal */}
			<DeleteCategoryModalComponent
				modalTitle="Confirm Delete"
				deleteCategoryModal={deleteCategoryModal}
				setDeleteCategoryModal={setDeleteCategoryModal}
				handleDeleteCategoryCancelledRequest={
					handleDeleteCategoryCancelledRequest
				}
				handleClick={handleDeleteCategoryConfirmedRequest}
				expandedArray={expandedArray}
				checkedArray={checkedArray}
			/>
		</Layout>
	);
};

export default Category;
