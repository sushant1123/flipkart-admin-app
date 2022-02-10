import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { signout } from "../../redux/actionCreators/asyncActions";

const Header = () => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const renderLoggedUserInLinks = () => {
		return (
			<Nav>
				<li className="nav-item">
					<span className="nav-link" onClick={handleLogoutRequest}>
						Sign Out
					</span>
				</li>
			</Nav>
		);
	};
	const renderNonLoggedUserInLinks = () => {
		return (
			<Nav>
				<li className="nav-item">
					<NavLink to={"/signin"} className="nav-link">
						Sign In
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to={"/signup"} className="nav-link">
						Sign Up
					</NavLink>
				</li>
			</Nav>
		);
	};

	const handleLogoutRequest = () => {
		dispatch(signout());
	};

	return (
		<>
			<Navbar
				collapseOnSelect
				expand="lg"
				fixed="top"
				bg="dark"
				variant="dark"
				style={{ zIndex: 999 }}
			>
				<Container fluid>
					<Link className="navbar-brand" to={"/"}>
						Admin Dashboard
					</Link>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							{/* <NavDropdown
								title="Dropdown"
								id="collasible-nav-dropdown"
							>
								<NavDropdown.Item href="#action/3.1">
									Action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
							</NavDropdown> */}
						</Nav>

						{auth.authenticate
							? renderLoggedUserInLinks()
							: renderNonLoggedUserInLinks()}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Header;
