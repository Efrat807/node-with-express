import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_URL = 'http://localhost:3000';
// const API_URL = `${import.meta.env.VITE_REACT_APP_SERVER_URL}/`;

export const login = async (username: string, password: string) => {
	const response = await axios.post(`${API_URL}/login`, { username, password });
	if (response.data.token) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}
	return response.data;
};

export const logout = () => {
	localStorage.removeItem('user');
};

export const getCurrentUser = () => {
	const userStr = localStorage.getItem('user');
	if (userStr) return JSON.parse(userStr);
	return null;
};

export const isTokenValid = () => {
	const user = getCurrentUser();
	if (user && user.token) {
		const decodedToken = jwtDecode<{ exp: number }>(user.token);
		return decodedToken.exp * 1000 > Date.now();
	}
	return false;
};

export const signup = async (username: string, password: string) => {
	const response = await axios.post(`${API_URL}/signup`, {
		username,
		password,
	});
	if (response.data.token) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}
	return response.data;
};
