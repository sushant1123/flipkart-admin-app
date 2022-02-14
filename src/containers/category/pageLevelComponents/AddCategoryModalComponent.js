// import { Col, Row } from "react-bootstrap";
import Input from "../../../components/UI/Input";
import CustomModal from "../../../components/UI/Modal/Modal";

const AddCategoryModalComponent = (props) => {
	const {
		show,
		handleClose,
		modalTitle,
		newCategory,
		setNewCategory,
		newCategoryParentId,
		setNewCategoryParentId,
		handleClick,
		handleCategoryPictureUpload,
		categoryList,
	} = props;
	return (
		<CustomModal
			show={show}
			handleClose={handleClose}
			modalTitle={modalTitle}
			handleClick={handleClick}
			btnName="Add"
		>
			<Input
				type="text"
				placeholder="Category Name"
				value={newCategory}
				onChange={(e) => setNewCategory(e.target.value)}
				className={"form-control-sm"}
			/>

			<select
				className="form-select form-select-sm"
				value={newCategoryParentId}
				onChange={(e) => setNewCategoryParentId(e.target.value)}
			>
				<option value={""}>Select Parent Category</option>
				{categoryList.map((cat) => {
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
				className="form-control-sm"
				onChange={handleCategoryPictureUpload}
			/>
		</CustomModal>
	);
};

export default AddCategoryModalComponent;
