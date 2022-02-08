import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Layout from "../../components/layouts/Layout";
import Input from "../../components/UI/Input";
import { login } from "../../redux/actionCreators/asyncActionCreators";

const Signin = (props) => {
	const dispatch = useDispatch();

	const signInHandler = (e) => {
		e.preventDefault();

		const user = {
			email: "sushant@gmail.com",
			password: "Sushant@123",
		};

		// login(user);
		dispatch(login(user));
	};

	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: "3rem" }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={signInHandler}>
							<Input
								label="Email"
								type="email"
								placeholder="Email"
								errorMsg=""
								value=""
								onChange={() => {}}
							/>

							<Input
								label="Password"
								type="password"
								placeholder="Password"
								errorMsg=""
								value=""
								onChange={() => {}}
							/>

							<Button
								variant="primary"
								type="submit"
								style={{ width: "100%" }}
							>
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};

export default Signin;
