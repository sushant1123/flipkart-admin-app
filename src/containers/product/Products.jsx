import React, { useState } from "react";
import { Col, Container, Row, Button, Form, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

//modals & custom components
import Layout from "../../components/layouts/Layout";
import Input from "../../components/UI/Input";
import CustomModal from "../../components/UI/Modal/Modal";

//actions
import { addNewProduct, deleteProductById } from "../../redux/actionCreators/actions";

//helpers
import { generatePublicURL } from "../../helpers/urlConfig";

//css
import "./product.css";

const Products = () => {
	const [show, setShow] = useState(false);
	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [productPictures, setProductPictures] = useState([]);

	//details
	const [productDetailModal, setProductDetailModal] = useState(false);
	const [productDetails, setProductDetails] = useState(null);

	const category = useSelector((state) => state.category);
	const product = useSelector((state) => state.product);

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
		if (!name) {
			alert("name is required");
			return;
		}

		if (!price) {
			alert("price is required");
			return;
		}

		// if (!description) {
		// 	alert("description is required");
		// 	return;
		// }

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

	const handleProductDetailsModalClose = () => {
		setProductDetailModal(false);
	};

	const handleDeleteProductByIdRequest = (id) => {
		const payload = {
			productId: id,
		};
		dispatch(deleteProductById(payload));
	};

	const renderAllProducts = () => {
		return (
			<Table style={{ fontSize: 14 }} responsive="sm" cstriped="true" bordered hover variant="dark">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Category</th>
						<th>Info</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{product.products.length
						? product.products.map((singleProduct, index) => {
								return (
									<tr
										key={singleProduct._id}
										// onClick={() => {
										// 	showProductDetails(singleProduct);
										// }}
									>
										<td>{index + 1}</td>
										<td>{singleProduct.name}</td>
										<td>{singleProduct.price}</td>
										<td>{singleProduct.quantity}</td>
										<td>{singleProduct.category.name}</td>
										<td>
											<button onClick={() => showProductDetails(singleProduct)}>
												INFO
											</button>
										</td>
										<td>
											<button
												onClick={() => {
													handleDeleteProductByIdRequest(singleProduct._id);
												}}
											>
												DELETE
											</button>
										</td>
									</tr>
								);
						  })
						: null}
				</tbody>
			</Table>
		);
	};

	const renderAddProductModal = () => {
		return (
			<CustomModal
				show={show}
				handleClose={handleClose}
				modalTitle="Add New Product"
				handleClick={handleAddNewProductRequest}
				btnName="Add"
			>
				<Input
					type="text"
					className="form-control-sm"
					placeholder="Product Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					type="number"
					className="form-control-sm"
					label="Product Quantity"
					placeholder="Product Quantity"
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
				/>
				<Input
					type="number"
					// label="Product Price"
					className="form-control-sm"
					placeholder="Product Price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<Input
					type="text"
					className="form-control-sm"
					// label="Product Description"
					placeholder="Product Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<Form.Select
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
					className="form-select-sm"
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
					productPictures.map((pic, index) => <div key={index}>{pic.name}</div>)}
				<Input
					type="file"
					className="form-control-sm"
					name="productPicture"
					id="productPicture"
					onChange={handleProductPictureUpload}
				/>
			</CustomModal>
		);
	};

	const renderProductDetailsModal = () => {
		if (!productDetails) {
			return null;
		}

		return (
			<CustomModal
				show={productDetailModal}
				handleClose={handleProductDetailsModalClose}
				handleClick={handleProductDetailsModalClose}
				modalTitle={productDetails.name}
				btnName="Close"
				size="lg"
			>
				<Row>
					<Col md="6">
						<label className="key">Name:</label>
						<p className="value">{productDetails.name}</p>
					</Col>
					<Col md="6">
						<label className="key">Price:</label>
						<p className="value">{productDetails.price}</p>
					</Col>
				</Row>
				<Row>
					<Col md="6">
						<label className="key">Quantity:</label>
						<p className="value">{productDetails.quantity}</p>
					</Col>
					<Col md="6">
						<label className="key">Category:</label>
						<p className="value">{productDetails.category.name}</p>
					</Col>
				</Row>
				<Row>
					<Col md="12">
						<label className="key">Description:</label>
						<p className="value">{productDetails.description}</p>
					</Col>
				</Row>

				{/* <Carousel fade variant="dark">
					{productDetails.productPictures.map((pic) => (
						<Carousel.Item>
							<img
								className="d-block w-100"
								height="500px"
								src={`http://localhost:2000/public/${pic.img}`}
								alt={pic._id}
							/>
							<Carousel.Caption>
								<h3>First slide label</h3>
								<p>
									Nulla vitae elit libero, a pharetra augue
									mollis interdum.
								</p>
							</Carousel.Caption>
						</Carousel.Item>
					))}
				</Carousel> */}

				<div className="album">
					<div className="imgContainer">
						<Row className="row mt-3">
							{productDetails.productPictures.map((pic) => {
								return (
									<Col
										key={pic._id}
										md={6}
										className="col px-3"
										style={{ marginBottom: "1rem" }}
									>
										<img src={generatePublicURL(pic.img)} alt="" />
									</Col>
								);
							})}
						</Row>
					</div>
				</div>
			</CustomModal>
		);
	};

	const showProductDetails = (product) => {
		setProductDetails(product);
		setProductDetailModal(true);
	};

	return (
		<Layout sidebar>
			<Container>
				<Row
					style={{
						marginBottom: "12px",
					}}
				>
					<Col md={12}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<h3>Products</h3>
							<Button variant="primary" onClick={handleShow}>
								Add
							</Button>
						</div>
					</Col>
				</Row>

				<Row>
					{product.error ? <h1>Error fetching products data</h1> : <Col>{renderAllProducts()}</Col>}
				</Row>
			</Container>

			{renderAddProductModal()}
			{renderProductDetailsModal()}
		</Layout>
	);
};

export default Products;
