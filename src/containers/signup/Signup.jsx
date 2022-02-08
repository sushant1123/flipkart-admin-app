import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Layout from "../../components/layouts/Layout";
import Input from "../../components/UI/Input";

const Signup = (props) => {
	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: "3rem" }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form>
							<Row>
								<Col md={{ span: 6 }}>
									<Input
										label="First Name"
										type="text"
										placeholder="First Name"
										errorMsg=""
										value=""
										onChange={() => {}}
									/>
								</Col>
								<Col md={{ span: 6 }}>
									<Input
										label="Last Name"
										type="text"
										placeholder="Last Name"
										errorMsg=""
										value=""
										onChange={() => {}}
									/>
								</Col>
							</Row>

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

export default Signup;
