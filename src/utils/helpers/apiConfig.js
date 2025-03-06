import axios from "axios";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
if (!serverUrl) {
  console.error("SERVER_URL is not defined");
}
const http = axios.create({
  baseURL: serverUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
http.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);
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
