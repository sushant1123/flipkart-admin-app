import React from "react";
import { Form } from "react-bootstrap";

const Input = (props) => {
	let input = null;
	switch (props.type) {
		case "select":
			input = (
				<select
					className="form-select form-select-sm"
					value={props.value}
					onChange={props.onChange}
				>
					<option value="">{props.placeholder}</option>
					{props.options.length > 0
						? props.options.map((option, index) => {
								return (
									<option key={index} value={option.value}>
										{option.name}
									</option>
								);
						  })
						: null}
				</select>
			);
			break;

		case "text":
		case "file":
		default:
			input = (
				<Form.Group className="mb-3" id={props.id}>
					{props.label && <Form.Label>{props.label}</Form.Label>}
					{props.type === "file" && <br />}
					<Form.Control
						type={props.type}
						placeholder={props.placeholder}
						value={props.value}
						onChange={props.onChange}
						{...props}
					/>
					<Form.Text className="text-muted">
						{props.errormsg}
					</Form.Text>
				</Form.Group>
			);
			break;
	}

	return input;
	// <Form.Group className="mb-3" id={props.id}>
	// 	{/* <Form.Label>{props.label}</Form.Label> */}
	// 	{props.label && <Form.Label>{props.label}</Form.Label>}
	// 	{props.type === "file" && <br />}
	// 	<Form.Control
	// 		type={props.type}
	// 		placeholder={props.placeholder}
	// 		value={props.value}
	// 		onChange={props.onChange}
	// 		{...props}
	// 	/>
	// 	<Form.Text className="text-muted">{props.errormsg}</Form.Text>
	// </Form.Group>
};

export default Input;
