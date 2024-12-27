import axiosSkaarl from "../utils/api";

const getWatchlist = async () => {
  const response = await axiosSkaarl.get("/watchlist");
  if (response.status == 200) {
    return response.data;
  }
  return null;
};

const getWatchlistChanged = async () => {
  const response = await axiosSkaarl.get("/watchlist/change");
  if (response.status == 200) {
    return response.data;
  }
  return null;
};

const addToWatchList = async (symbol) => {
  const response = await axiosSkaarl.post("/watchlist", { symbol: symbol });
  if (response.status == 200) {
    return response.data;
  }
  return null;
};

const deleteFromWatchlist = async (id) => {
  const response = await axiosSkaarl.delete("/watchlist/" + id);
  if (response.status == 200) {
    return response.data;
  }
  return null;
};

export {
  getWatchlist,
  getWatchlistChanged,
  addToWatchList,
  deleteFromWatchlist,
};
