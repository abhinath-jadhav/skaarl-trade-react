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

export { getWatchlist, getWatchlistChanged };
