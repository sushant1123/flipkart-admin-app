//baseurl should be of the rest server and not our front-end

const localhost = "http://localhost:2000";
const herokuhosturl = "https://flipkart-rest-backend-server.herokuapp.com";
const baseUrl = window.location.hostname === "localhost" ? localhost : herokuhosturl;

export const API = `${baseUrl}/api`;

export const generatePublicURL = (filename) => {
	return `${baseUrl}/public/${filename}`;
};
