import { Col, Row } from "react-bootstrap";
import Input from "../../../components/UI/Input";
import CustomModal from "../../../components/UI/Modal/Modal";

/* Update Category modal */
const UpdateCategoryModalComponent = (props) => {
	const {
		size,
		show,
		handleClose,
		handleClick,
		expandedArray,
		checkedArray,
		handleCategoryInput,
		categoryList,
	} = props;

	return (
		<CustomModal
			show={show}
			handleClose={handleClose}
			modalTitle="Update Category"
			handleClick={handleClick}
			btnName="Update"
			size={size}
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
									className="form-control-sm"
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
									// className="form-select"
									className="form-select form-select-sm"
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
									{categoryList.map((cat) => {
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
									className="form-select form-select-sm"
									value={item.type}
									onChange={(e) =>
										handleCategoryInput(
											"type",
											e.target.value,
											index,
											"expanded"
										)
									}
								>
									<option value={""}>Select Type</option>
									<option value={"store"}>Store</option>
									<option value={"product"}>Product</option>
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
									className="form-control-sm"
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
									// className={"form-control-sm"}
									className="form-select form-select-sm"
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
									{categoryList.map((cat) => {
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
									// className="form-select"
									className="form-select form-select-sm"
									value={item.type}
									onChange={(e) =>
										handleCategoryInput(
											"type",
											e.target.value,
											index,
											"checked"
										)
									}
								>
									<option value={""}>Select Type</option>
									<option value={"store"}>Store</option>
									<option value={"product"}>Product</option>
									<option value={"page"}>Page</option>
								</select>
							</Col>
						</Row>
					);
				})}
		</CustomModal>
	);
};

export default UpdateCategoryModalComponent;
