import axios from "axios";
import axiosSkaarl from "../utils/api";

const authorise = async () => {
  let res = null;
  const broker = localStorage.getItem("broker");
  if (broker != null && broker === "upstox") {
    res = await axios.post(
      "http://localhost:8083/api/v1/auth/upstox/authorise",
      {},
      {
        withCredentials: true,
      }
    );
  } else if (broker === "fivePaisa") {
    res = await axios.post("http://localhost:8083/api/v1/auth/authorise", {});
  }
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

export { saveUserInfo, authorise };
