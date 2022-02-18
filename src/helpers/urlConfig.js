//baseurl should be of the rest server and not our front-end
const baseUrl = "https://flipkart-rest-backend-server.herokuapp.com/";

export const API = `${baseUrl}/api`;

export const generatePublicURL = (filename) => {
	return `${baseUrl}/public/${filename}`;
};
