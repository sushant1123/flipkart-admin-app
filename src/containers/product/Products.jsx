import React, { useState } from "react";
import { Col, Container, Row, Button, Form, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/layouts/Layout";
import Input from "../../components/UI/Input";
import CustomModal from "../../components/UI/Modal/Modal";
import { addNewProduct } from "../../redux/actionCreators/asyncActions";

const Products = () => {
	const [show, setShow] = useState(false);
	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [productPictures, setProductPictures] = useState([]);

	const category = useSelector((state) => state.category);
	const dispatch = useDispatch();

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
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

	const handleProductPictureUpload = (e) => {
		console.log(e.target.files[0]);
		setProductPictures((prevPics) => {
			return [...prevPics, e.target.files[0]];
		});
	};

	const handleAddNewProductRequest = (e) => {
		const addProductForm = new FormData();
		addProductForm.append("name", name);
		addProductForm.append("quantity", quantity);
		addProductForm.append("price", price);
		addProductForm.append("description", description);
		addProductForm.append("category", categoryId);

		for (let productPicture of productPictures) {
			addProductForm.append("productPicture", productPicture);
		}

		dispatch(addNewProduct(addProductForm));

		setName("");
		setQuantity(1);
		setPrice("");
		setDescription("");
		setCategoryId("");
		setProductPictures([]);

		handleClose();
	};

	const renderAllProducts = () => {
		return (
			<Table
				responsive="sm"
				cstriped="true"
				bordered
				hover
				variant="dark"
			>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Description</th>
						<th>Category</th>
						<th>Table heading</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Table cell</td>
						<td>Table cell</td>
						<td>Table cell</td>
						<td>Table cell</td>
						<td>Table cell</td>
						<td>Table cell</td>
					</tr>
				</tbody>
			</Table>
		);
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
							<h3>Product</h3>
							<Button variant="primary" onClick={handleShow}>
								Add
							</Button>
						</div>
					</Col>
				</Row>

				<Row>
					<Col>{renderAllProducts()}</Col>
				</Row>
			</Container>

			<CustomModal
				show={show}
				handleClose={handleClose}
				modalTitle="Add New Product"
				handleClick={handleAddNewProductRequest}
				btnName="Add"
			>
				<Input
					type="text"
					// label="Product Name"
					placeholder="Product Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					type="number"
					label="Product Quantity"
					placeholder="Product Quantity"
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
				/>
				<Input
					type="text"
					// label="Product Price"
					placeholder="Product Price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<Input
					type="text"
					// label="Product Description"
					placeholder="Product Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<Form.Select
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
				>
					<option value={""}>Select Parent Category</option>
					{renderAllCategories(category.categories).map((cat) => {
						return (
							<option key={cat.value} value={cat.value}>
								{cat.name}
							</option>
						);
					})}
				</Form.Select>

				{productPictures.length > 0 &&
					productPictures.map((pic, index) => (
						<div key={pic.index}>{pic.name}</div>
					))}
				<Input
					type="file"
					name="productPicture"
					id="productPicture"
					onChange={handleProductPictureUpload}
				/>
			</CustomModal>
		</Layout>
	);
};

export default Products;
