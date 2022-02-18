const baseUrl = "https://flipkart-app-admin-app.herokuapp.com";

export const API = `${baseUrl}/api`;

export const generatePublicURL = (filename) => {
	return `${baseUrl}/public/${filename}`;
};
