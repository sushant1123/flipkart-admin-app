import CustomModal from "../../../components/UI/Modal/Modal";
import { Col, Row } from "react-bootstrap";

const DeleteCategoryModalComponent = (props) => {
	// console.log("delete:", checkedArray);
	const {
		modalTitle,
		deleteCategoryModal,
		setDeleteCategoryModal,
		handleDeleteCategoryCancelledRequest,
		handleClick,
		expandedArray,
		checkedArray,
	} = props;

	return (
		<CustomModal
			show={deleteCategoryModal}
			handleClose={() => setDeleteCategoryModal(false)}
			modalTitle={modalTitle}
			buttons={[
				{
					label: "Cancel",
					variant: "primary",
					onClick: handleDeleteCategoryCancelledRequest,
				},
				{
					label: "Delete",
					variant: "danger",
					onClick: handleClick,
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

export default DeleteCategoryModalComponent;
