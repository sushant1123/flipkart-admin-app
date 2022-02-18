import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

//custom components
import Layout from "../../components/layouts/Layout";
import Input from "../../components/UI/Input";

//actions
import { signup } from "../../redux/actionCreators/actions";

const Signup = (props) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [error, setError] = useState("");
	const auth = useSelector((state) => state.auth);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!user.loading) {
			setFirstName("");
			setLastName("");
			setEmail("");
			setPassword("");
		}
	}, [user.loading]);

	if (auth.authenticate) {
		return <Navigate to="/" />;
	}

	if (user.loading) {
		return <h1>Loading.....!</h1>;
	}

	const SignupHandler = (e) => {
		e.preventDefault();

		let userObj = {
			firstName,
			lastName,
			email,
			password,
		};

		dispatch(signup(userObj));
	};

	return (
		<Layout>
			<Container>
				<h3>{user.message}</h3>
				<h3>{user.error}</h3>
				<Row style={{ marginTop: "10%" }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={SignupHandler}>
							<Row>
								<Col md={{ span: 6 }}>
									<Input
										label="First Name"
										type="text"
										id="firstName"
										placeholder="First Name"
										errorMsg=""
										value={firstName}
										onChange={(e) => {
											setFirstName(e.target.value);
										}}
									/>
								</Col>
								<Col md={{ span: 6 }}>
									<Input
										label="Last Name"
										type="text"
										id="lastName"
										placeholder="Last Name"
										errorMsg=""
										value={lastName}
										onChange={(e) => {
											setLastName(e.target.value);
										}}
									/>
								</Col>
							</Row>

							<Input
								label="Email"
								type="email"
								id="email"
								placeholder="Email"
								errorMsg=""
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>

							<Input
								label="Password"
								type="password"
								id="password"
								placeholder="Password"
								errorMsg=""
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

export default Signup;
