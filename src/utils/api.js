import axios from "axios";

const axiosSkaarl = axios.create({
  baseURL: "http://localhost:8765/MS-SKAARL-TRADE/api/v1",
  withCredentials: true,
});

axiosSkaarl.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        alert("Unauthorized! Please log in again.");
      } else if (error.response.status === 404) {
        alert("API not found.");
      } else {
        alert("An unexpected error occurred.");
      }
    } else if (error.request) {
      alert("Network error. Please check your connection.");
    } else {
      alert("Something went wrong!");
    }
    return null;
  }
);

export default axiosSkaarl;
