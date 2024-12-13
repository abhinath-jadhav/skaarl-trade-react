import axios from "axios";
import axiosSkaarl from "../utils/api";

const authorise = async () => {
  const res = await axios.post(
    "http://localhost:8081/api/v1/auth/authorise",
    {},
    {
      withCredentials: true,
    }
  );
  if (res.status == 200) {
    return await res.data;
  }
  return null;
};

const saveUserInfo = async (userinfo) => {
  const response = await axiosSkaarl.post("/userinfo", userinfo);

  if (response.status == 200) {
    return response.data;
  }
  return null;
};

export { saveUserInfo, authorise };
