import axiosSkaarl from "../utils/api";

const placeOrder = async (data) => {
  const response = await axiosSkaarl.post("/fivepaisa/order", data);
  console.log(response);
};

export { placeOrder };
