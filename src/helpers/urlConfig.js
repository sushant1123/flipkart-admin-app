const localhostUrl = "http://localhost:2000";
const herokuUrl = "https://flipkart-app-admin-app.herokuapp.com";

const baseUrl = window.location.hostname === "localhost" ? localhostUrl : herokuUrl;

export const API = `${baseUrl}/api`;

export const generatePublicURL = (filename) => {
	return `${baseUrl}/public/${filename}`;
};
