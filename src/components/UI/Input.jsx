import React from "react";
import { Form } from "react-bootstrap";

const Input = (props) => {
	return (
		<Form.Group className="mb-3" controlId={props.id}>
			{/* <Form.Label>{props.label}</Form.Label> */}
			{props.label && <Form.Label>{props.label}</Form.Label>}
			{props.type === "file" && <br />}
			<Form.Control
				type={props.type}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
			/>
			<Form.Text className="text-muted">{props.errorMsg}</Form.Text>
		</Form.Group>
	);
};

export default Input;
