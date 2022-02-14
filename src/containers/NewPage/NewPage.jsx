import React, { useEffect, useState } from "react";
import { Row, Col, Button, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/layouts/Layout";
import Input from "../../components/UI/Input";
import CustomModal from "../../components/UI/Modal/Modal";
import linearCategoriesList from "../../helpers/linearCategoryList";

//actions
import { createPage } from "../../redux/actionCreators/actions";

const NewPage = () => {
	const [createModal, setCreateModal] = useState(false);

	const [title, setTitle] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [type, setType] = useState("");
	const [description, setDescription] = useState("");
	const [banners, setBanners] = useState([]);
	const [products, setProducts] = useState([]);

	const [categories, setCategories] = useState("");

	const category = useSelector((state) => state.category);
	const page = useSelector((state) => state.page);
	const dispath = useDispatch();

	useEffect(() => {
		setCategories(linearCategoriesList(category.categories));
	}, [category]);

	useEffect(() => {
		console.log(page);
		if (!page.loading) {
			setCreateModal(false);
			setTitle("");
			setType("");
			setCategoryId("");
			setDescription("");
			setBanners([]);
			setProducts([]);
		}
	}, [page]);

	//handlers
	const handleBannerImageUploads = (e) => {
		console.log(e);
		setBanners([...banners, e.target.files[0]]);
	};

	const handleProductImageUploads = (e) => {
		console.log(e);
		setProducts([...products, e.target.files[0]]);
	};

	const onCategoryChangeHandler = (e) => {
		// console.log(e.target.value);
		const selectedCat = categories.find(
			(cate) => cate.value === e.target.value
		);
		setCategoryId(e.target.value);
		setType(selectedCat.type);
	};

	const handleAddPageRequest = (e) => {
		if (categoryId === "") {
			alert("category is required");
			return;
		}

		if (title === "") {
			alert("title is required");
			return;
		}

		if (description === "") {
			alert("description is required");
			return;
		}

		const form = new FormData();
		form.append("title", title);
		form.append("description", description);
		form.append("category", categoryId);
		form.append("type", type);

		banners.forEach((banner, index) => {
			form.append("banners", banner);
		});

		products.forEach((product, index) => {
			form.append("products", product);
		});

		// for (let entry of form.entries()) {
		// 	console.log(entry[0], entry[1]);
		// }

		dispath(createPage(form));

		// setCreateModal(false);
	};

	const renderCreatePageModal = () => {
		return (
			<CustomModal
				show={createModal}
				handleClose={() => setCreateModal(false)}
				handleClick={handleAddPageRequest}
				modalTitle="Create New Page"
				btnName="Create"
			>
				<Container>
					<Row>
						<Col>
							<Input
								type="select"
								value={categoryId}
								onChange={onCategoryChangeHandler}
								placeholder={"Select Category"}
								options={categories}
							/>
						</Col>
					</Row>
					<br />

					<Row>
						<Col>
							<Input
								type="text"
								className="form-control-sm"
								placeholder="Page Title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Col>
					</Row>

					<Row>
						<Col>
							<Input
								type="text"
								placeholder="Page Description"
								className="form-control-sm"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Col>
					</Row>

					{banners.length > 0 &&
						banners.map((banner, index) => {
							return (
								<Row key={`${banner.name}-${index}`}>
									<Col>{banner.name}</Col>
								</Row>
							);
						})}

					<Row>
						<Col md={12}>
							<Input
								type="file"
								className="form-control-sm"
								label="Banners"
								name="banners"
								onChange={handleBannerImageUploads}
							/>
						</Col>
					</Row>

					{products.length > 0 &&
						products.map((product, index) => {
							return (
								<Row key={`${product.name}-${index}`}>
									<Col>{product.name}</Col>
								</Row>
							);
						})}

					<Row>
						<Col md={12}>
							<Input
								type="file"
								className="form-control-sm"
								label="Products"
								name="products"
								onChange={handleProductImageUploads}
							/>
						</Col>
					</Row>
				</Container>
			</CustomModal>
		);
	};
	return (
		<Layout sidebar>
			{page.loading ? (
				<>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</>
			) : (
				<>
					<Button onClick={() => setCreateModal(true)}>
						Show Modal
					</Button>
					{renderCreatePageModal()}
				</>
			)}
		</Layout>
	);
};

export default NewPage;
