import axiosSkaarl from "../utils/api";

const placeOrder = async (data) => {
  const response = await axiosSkaarl.post("/fivepaisa/order", data);
  console.log(response);
};

const getOrderbook = async () => {
  const response = await axiosSkaarl.get("/fivepaisa/order");
  if (response.status == 200) {
    return response.data;
  }
  return null;
};

export { placeOrder, getOrderbook };
