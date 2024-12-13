import axiosSkaarl from "../utils/api";

const getCandleData = async (stock, interval) => {
  // const url = stock + "/" + interval;
  const response = await axiosSkaarl.post("/candles", {
    stock: stock,
    interval: interval,
  });
  if (response.status == 200) {
    return response.data;
  }
  return null;
};

export { getCandleData };
