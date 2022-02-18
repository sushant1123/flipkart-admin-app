import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

//customs components
import Layout from "../../components/layouts/Layout";
import Input from "../../components/UI/Input";

//actions
import { login } from "../../redux/actionCreators/actions";

const Signin = (props) => {
	//states of our page
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [error, setError] = useState("");

	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const signInHandler = (e) => {
		e.preventDefault();

		const user = {
			email,
			password,
		};

		dispatch(login(user));
	};

	if (auth.authenticate) {
		return <Navigate to="/" />;
	}

	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: "10%" }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={signInHandler}>
							<Input
								label="Email"
								type="email"
								id="email"
								placeholder="Email"
								errormsg=""
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<Input
								label="Password"
								type="password"
								id="password"
								placeholder="Password"
								errormsg=""
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>

							<Button variant="primary" type="submit" style={{ width: "100%" }}>
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
