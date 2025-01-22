import axios from "axios";

const serverUrl = import.meta.env.SERVER_URL;
// const apiKey = import.meta.env.VITE_API_KEY;

const http = axios.create({
    baseURL: serverUrl,
    headers: {
        'Content-Type': 'application/json',
        // ...(apiKey && { 'apiKey': apiKey }),
    },
});

// Interceptor cho request
http.interceptors.request.use(
    (config) => {
        // Can add token or other logic before sending request
        return config;
    },
    (error) => {
        // Error handling when configuring requests
        return Promise.reject(error);
    }
);

// Interceptor cho response
http.interceptors.response.use(
    (response) => response.data.data,
    (error) => {
        const errorResponse = error.response?.data;

        if (errorResponse && errorResponse.code === 400 && errorResponse.data) {
            return Promise.reject(errorResponse.data);
        }

        return Promise.reject(errorResponse || error.message);
    }
);

export default http;