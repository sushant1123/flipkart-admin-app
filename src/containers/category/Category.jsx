import React, { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import Layout from "../../components/layouts/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
	addNewCategory,
	deletedCategories,
	getAllCategories,
	updateCategories,
} from "../../redux/actionCreators/asyncActions";
import CustomModal from "../../components/UI/Modal/Modal";
import CheckboxTree from "react-checkbox-tree";

//icons
import { IoChevronForwardOutline, IoChevronDownOutline } from "react-icons/io5";

import { IoIosBody, IoIosCheckbox, IoIosCheckboxOutline } from "react-icons/io";
import { BiCheckbox } from "react-icons/bi";
import { FaFolder, FaFolderOpen } from "react-icons/fa";

//css
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const Category = () => {
	const category = useSelector((state) => state.category);
	const dispatch = useDispatch();

	const [show, setShow] = useState(false);
	const [newCategory, setNewCategory] = useState("");
	const [newCategoryParentId, setNewCategoryParentId] = useState(undefined);
	const [type, setType] = useState("");
	const [newCategoryPicture, setNewCategoryPicture] = useState("");
	const [checked, setChecked] = useState([]);
	const [expanded, setExpanded] = useState([]);
	const [checkedArray, setCheckedArray] = useState([]);
	const [expandedArray, setExpandedArray] = useState([]);
	const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
	const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
	const renderAllCategories = (categories, categoryArr = []) => {
		for (let category of categories) {
			categoryArr.push({
				name: category.name,
				value: category._id,
				parentId: category.parentId,
			});
			if (category.subCategories.length) {
				renderAllCategories(category.subCategories, categoryArr);
			}
		}

		return categoryArr;
	};

	const handleCategoryPictureUpload = (e) => {
		setNewCategoryPicture(e.target.files[0]);
	};

	const handleAddNewCategoryRequest = () => {
		const form = new FormData();
		form.append("name", newCategory);
		if (newCategoryParentId) {
			form.append("parentId", newCategoryParentId);
		}
		form.append("categoryPicture", newCategoryPicture);

		// console.log(newCategory, newCategoryParentId, newCategoryPicture);
		dispatch(addNewCategory(form));

		setNewCategory("");
		setNewCategoryParentId(undefined);
		setNewCategoryPicture("");

		handleClose();
	};

	const handleUpdateCategoryRequest = () => {
		// alert("clicked");
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

		dispatch(updateCategories(form)).then((success) => {
			if (success) {
				dispatch(getAllCategories());
				setUpdateCategoryModal(false);
			}
		});

		// setUpdateCategoryModal(false);
	};

	const handleDeleteCategoryConfirmedRequest = () => {
		const checkedIdsArray = checkedArray.map((item, index) => ({
			_id: item.value,
		}));

		// const expandedIdsArray = expandedArray.map((item, index) => ({
		// 	_id: item.value,
		// }));

		// const idsArray = [...checkedIdsArray, ...expandedIdsArray];
		const idsArray = [...checkedIdsArray];

		dispatch(deletedCategories(idsArray)).then((success) => {
			if (success) {
				dispatch(getAllCategories());
			}
		});

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
		const allCategories = renderAllCategories(category.categories);
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

	/* Update Category modal */
	const renderUpdateCategoryModal = () => {
		return (
			<CustomModal
				show={updateCategoryModal}
				handleClose={() => setUpdateCategoryModal(false)}
				modalTitle="Update Category"
				handleClick={handleUpdateCategoryRequest}
				btnName="Update"
				size="lg"
			>
				<Row>
					<Col>
						<h5>Expanded</h5>
					</Col>
				</Row>
				{expandedArray.length > 0 &&
					expandedArray.map((item, index) => {
						return (
							<Row key={index}>
								<Col md={4} sm={12}>
									<Input
										type="text"
										placeholder="Category Name"
										value={item.name}
										onChange={(e) =>
											handleCategoryInput(
												"name",
												e.target.value,
												index,
												"expanded"
											)
										}
									/>
								</Col>
								<Col md={5} sm={12}>
									<select
										className="form-select"
										value={item.parentId}
										onChange={(e) =>
											handleCategoryInput(
												"parentId",
												e.target.value,
												index,
												"expanded"
											)
										}
									>
										<option value={""}>
											Select Parent Category
										</option>
										{renderAllCategories(
											category.categories
										).map((cat) => {
											return (
												<option
													key={cat.value}
													value={cat.value}
												>
													{cat.name}
												</option>
											);
										})}
									</select>
									<br />
								</Col>

								<Col md={3} sm={12}>
									<select
										className="form-select"
										value={type}
										onChange={(e) =>
											setType(e.target.value)
										}
									>
										<option value={""}>Select Type</option>
										<option value={"store"}>Store</option>
										<option value={"product"}>
											Product
										</option>
										<option value={"page"}>Page</option>
									</select>
								</Col>
							</Row>
						);
					})}

				<Row>
					<Col>
						<h5>Checked</h5>
					</Col>
				</Row>

				{checkedArray.length > 0 &&
					checkedArray.map((item, index) => {
						return (
							<Row key={index}>
								<Col md={4} sm={12}>
									<Input
										type="text"
										placeholder="Category Name"
										value={item.name}
										onChange={(e) =>
											handleCategoryInput(
												"name",
												e.target.value,
												index,
												"checked"
											)
										}
									/>
								</Col>
								<Col md={5} sm={12}>
									<select
										className="form-select"
										value={item.parentId}
										onChange={(e) =>
											handleCategoryInput(
												"parentId",
												e.target.value,
												index,
												"checked"
											)
										}
									>
										<option value={""}>
											Select Parent Category
										</option>
										{renderAllCategories(
											category.categories
										).map((cat) => {
											return (
												<option
													key={cat.value}
													value={cat.value}
												>
													{cat.name}
												</option>
											);
										})}
									</select>
									<br />
								</Col>

								<Col md={3} sm={12}>
									<select
										className="form-select"
										value={type}
										onChange={(e) =>
											setType(e.target.value)
										}
									>
										<option value={""}>Select Type</option>
										<option value={"store"}>Store</option>
										<option value={"product"}>
											Product
										</option>
										<option value={"page"}>Page</option>
									</select>
								</Col>
							</Row>
						);
					})}
			</CustomModal>
		);
	};

	/* Add Category modal */
	const renderAddCategoryModal = () => {
		return (
			<CustomModal
				show={show}
				handleClose={handleClose}
				modalTitle="Add New Category"
				handleClick={handleAddNewCategoryRequest}
				btnName="Add"
			>
				<Input
					type="text"
					placeholder="Category Name"
					value={newCategory}
					onChange={(e) => setNewCategory(e.target.value)}
				/>

				<select
					className="form-select"
					value={newCategoryParentId}
					onChange={(e) => setNewCategoryParentId(e.target.value)}
				>
					<option value={""}>Select Parent Category</option>
					{renderAllCategories(category.categories).map((cat) => {
						return (
							<option key={cat.value} value={cat.value}>
								{cat.name}
							</option>
						);
					})}
				</select>

				<Input
					type="file"
					name="Category Picture"
					onChange={handleCategoryPictureUpload}
				/>
			</CustomModal>
		);
	};

	/* Delete Category modal */
	const renderDeleteCategoryModal = () => {
		// console.log("delete:", checkedArray);
		return (
			<CustomModal
				show={deleteCategoryModal}
				handleClose={() => setDeleteCategoryModal(false)}
				modalTitle="Confirm Delete"
				// handleClick={handleDeleteCategoryRequest}
				// btnName="Delete"
				buttons={[
					{
						label: "Cancel",
						variant: "primary",
						onClick: handleDeleteCategoryCancelledRequest,
					},
					{
						label: "Delete",
						variant: "danger",
						onClick: handleDeleteCategoryConfirmedRequest,
					},
				]}
			>
				<Row>
					<Col md={12}>
						<h5>Expanded</h5>
					</Col>

					{expandedArray &&
						expandedArray.map((item, index) => (
							<Col key={index} md={6}>
								{item.name}
							</Col>
						))}
				</Row>

				<Row>
					<Col md={12}>
						<h5>Checked</h5>
					</Col>

					{checkedArray &&
						checkedArray.map((item, index) => (
							<Col key={index} md={6}>
								{item.name}
							</Col>
						))}
				</Row>
			</CustomModal>
		);
	};

	return (
		<Layout sidebar>
			<Container>
				<Row style={{ marginBottom: "12px" }}>
					<Col md={12}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<h3>Category</h3>
							<Button variant="primary" onClick={handleShow}>
								Add
							</Button>
						</div>
					</Col>
				</Row>
				<Row>
					{/* Render nested list: Although not necessary rn. */}
					{/* <ul>{renderAllNestedCategories(category.categories)}</ul> */}
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
					<Col md={{ span: 3, offset: 3 }}>
						<Button
							variant="danger"
							onClick={showDeleteCategoryHandlerModal}
						>
							Delete
						</Button>
					</Col>
					<Col md={3}>
						<Button
							variant="warning"
							onClick={showUpdateCategoryHandlerModal}
						>
							Edit
						</Button>
					</Col>
				</Row>
			</Container>

			{/* Add Category modal */}
			{renderAddCategoryModal()}

			{/* Update Category Modal */}
			{renderUpdateCategoryModal()}

			{/* delete Category Modal */}
			{renderDeleteCategoryModal()}
		</Layout>
	);
};

export default Category;
