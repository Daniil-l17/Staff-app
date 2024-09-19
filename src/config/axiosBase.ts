import axios from 'axios';

export const axiosBase = axios.create({
	baseURL: import.meta.env.VITE_BACK_END_URL
});

axiosBase.interceptors.request.use(config => {
	const tokenAuth = localStorage.getItem('token');

	if (config && config.headers && tokenAuth) config.headers.Authorization = `Bearer ${tokenAuth}`;

	return config;
});
