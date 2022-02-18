const baseUrl = "https://flipkart-clone-admin-app.herokuapp.com";

export const API = `${baseUrl}/api`;

export const generatePublicURL = (filename) => {
	return `${baseUrl}/public/${filename}`;
};
