import axios from "axios";
import axiosSkaarl from "../utils/api";
import { baseUrl } from "../utils/config";

const authorise = async () => {
  let res = null;
  const broker = localStorage.getItem("broker");

  if (broker != null && broker === "upstox") {
    res = await axiosSkaarl.post("/api/v1/auth/upstox/authorise", {});
  } else if (broker === "fivePaisa") {
    res = await axiosSkaarl.get(baseUrl + "/auth/fivepaisa/margin", {});
  }
  if (res != null && res.status == 200) {
    return await res.data;
  }
  return null;
};

const signin = async (form) => {
  let res = await axios.post(baseUrl + "/auth/sign-in", form);
  if (res != null && res.status == 200) {
    return await res.data;
  }
  return null;
};

const saveUserInfo = async (userinfo) => {
  const response = await axiosSkaarl.post("/auth/upstox/userinfo", userinfo);

  if (response.status == 200) {
    return response.data;
  }
  return null;
};

const fivePaisaOtpLogin = async (otp) => {
  const response = await axiosSkaarl.post("/auth/fivepaisa/otp-login", {
    otp: otp,
  });

  if (response.status == 200) {
    return response.data;
  }
  return null;
};
const userLogout = async () => {
  localStorage.removeItem("LOCAL_JWT")
  const response = await axiosSkaarl.get("/auth/fivepaisa/logout");

  if (response.status == 200) {
    return response.data;
  }
  return null;
};

export { saveUserInfo, authorise, fivePaisaOtpLogin, userLogout, signin};
