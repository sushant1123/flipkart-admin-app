import "./App.css";
import Layout from "./components/layouts/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/home/Home";
import Signin from "./containers/signin/Signin";
import Signup from "./containers/signup/Signup";

const App = () => {
	return (
		<div className="App">
			{/* <Layout>
				<h1>Hello World</h1>
			</Layout> */}
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
