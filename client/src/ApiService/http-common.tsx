import axios from 'axios';
// import process from 'process';

const apiClient = axios.create({
	baseURL: 'http://localhost:3000/api/',
	// baseURL: `${process.env.REACT_APP_SERVER_URL}/`,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default apiClient;
