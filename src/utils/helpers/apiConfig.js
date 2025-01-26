import axios from "axios";

// Make sure your environment variable is correctly set
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL; // Use NEXT_PUBLIC_ for client-side usage

if (!serverUrl) {
  console.error("SERVER_URL is not defined");
}

const http = axios.create({
  baseURL: serverUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for request
http.interceptors.request.use(
  (config) => {
    // Can add token or other logic before sending the request
    return config;
  },
  (error) => {
    // Error handling when configuring requests
    return Promise.reject(error);
  }
);

// Interceptor for response
http.interceptors.response.use(
  (response) => response.data.data,  // Assuming response data has a `data` field
  (error) => {
    const errorResponse = error.response?.data;

    if (errorResponse && errorResponse.code === 400 && errorResponse.data) {
      return Promise.reject(errorResponse.data);
    }

    return Promise.reject(errorResponse || error.message);
  }
);

export default http;
