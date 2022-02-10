import React, { useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import Layout from "../../components/layouts/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
	addNewCategory,
	getAllCategories,
} from "../../redux/actionCreators/asyncActions";

const Category = () => {
	const category = useSelector((state) => state.category);
	const dispatch = useDispatch();

	//fetch categories on component mounted
	useEffect(() => {
		dispatch(getAllCategories());
	}, []);

	const [show, setShow] = useState(false);
	const [newCategory, setNewCategory] = useState("");
	const [newCategoryParentId, setNewCategoryParentId] = useState(undefined);
	const [newCategoryPicture, setNewCategoryPicture] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// recursive call to get the nested categories
	const renderAllNestedCategories = (categories) => {
		let nestedCategoryList = [];
		for (let category of categories) {
			nestedCategoryList.push(
				<li key={category.name}>
					<Col md={12}>{category.name}</Col>
					{category.subCategories.length ? (
						<ul>
							{renderAllNestedCategories(category.subCategories)}
						</ul>
					) : null}
				</li>
			);
		}

		return nestedCategoryList;
	};

	// recursive call to get all the categories
	const renderAllCategories = (categories, categoryArr = []) => {
		for (let category of categories) {
			categoryArr.push({ name: category.name, value: category._id });
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

		handleClose();
	};

	return (
		<Layout sidebar>
			<Container>
				<Row>
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
					<ul>{renderAllNestedCategories(category.categories)}</ul>
				</Row>
			</Container>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add New Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
				</Modal.Body>
				<Modal.Footer>
					{/* <Button variant="primary" onClick={handleClose}> */}
					<Button
						variant="primary"
						onClick={handleAddNewCategoryRequest}
					>
						Add New Category
					</Button>
				</Modal.Footer>
			</Modal>
		</Layout>
	);
};

export default Category;
