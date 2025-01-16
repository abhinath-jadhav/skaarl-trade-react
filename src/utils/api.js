import axios from "axios";
import { baseUrl } from "./config";

const axiosSkaarl = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

axiosSkaarl.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("Unauthorized! Please log in again.");
      } else if (error.response.status === 404) {
        console.log("API not found.");
      } else {
        console.log("An unexpected error occurred.");
      }
    } else if (error.request) {
      console.log("Network error. Please check your connection.");
    } else {
      console.log("Something went wrong!");
    }
    return null;
  }
);

export default axiosSkaarl;
