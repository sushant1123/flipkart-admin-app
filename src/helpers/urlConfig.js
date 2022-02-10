const localHostURL = "http://localhost:2000";
export const API = `${localHostURL}/api`;

export const generatePublicURL = (filename) => {
	return `${localHostURL}/public/${filename}`;
};
