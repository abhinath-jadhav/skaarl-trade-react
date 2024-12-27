import { PiChartLineUp } from "react-icons/pi";
import { IoIosBasket } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeStock } from "../../../store/stockSlice";
import { IoToggleSharp } from "react-icons/io5";
import {
  addToWatchList,
  deleteFromWatchlist,
} from "../../../service/WatchlistService";
import { ImBin } from "react-icons/im";
import Swal from "sweetalert2";
import { useState } from "react";
import { placeOrder } from "../../../service/OrderService";
import OrderModal from "../modal/OrderModal";

const HandleUserChoice = ({
  id,
  symbol,
  isSearch,
  handleOrder,
  handleRefresh,
  instrumentKeyUpStox,
  setShow,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSafeOrder = useSelector((state) => state.safeOrderSlice);

  const handleDelete = async () => {
    try {
      await deleteFromWatchlist(id);
      handleRefresh();
      Swal.fire({
        title: "Deleted!",
        text: "Item successfully removed from the watchlist.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderChart = (instrumentKeyUpStox) => {
    window.scrollTo(0, 0, { behavior: "smooth" });
    dispatch(changeStock(instrumentKeyUpStox));
    navigate(`/`);
  };

  const watchlistHandler = async (sym, opr) => {
    let res = null;

    if (opr === "add") {
      res = await addToWatchList(sym);
    } else {
      res = await deleteFromWatchlist(id);
    }
    if (res.status != 200) {
      Swal.fire({
        title: "Warning",
        text: "Something went wrong! Not added to watchlist.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex gap-2 text-slate-50 font-semibold dark:bg-black">
      <button
        className="px-2 py-1 rounded-sm text-green-700 bg-green-200 
             hover:text-green-200 hover:bg-green-600 "
        onClick={() => handleOrder("Buy")}
      >
        B
      </button>
      <button
        className="px-2 py-1 rounded-sm text-red-700 bg-red-200 hover:text-red-200 hover:bg-red-600"
        onClick={() => handleOrder("Sell")}
      >
        S
      </button>
      <button
        className="px-1 rounded-sm bg-blue-200 text-blue-700 hover:bg-blue-600 hover:text-blue-200"
        onClick={() => renderChart(instrumentKeyUpStox)}
      >
        <PiChartLineUp size={20} />
      </button>
      {isSearch ? (
        <button
          className="px-1 rounded-sm bg-gray-200 text-gray-700 hover:bg-gray-600 hover:text-gray-200"
          onClick={() => watchlistHandler(symbol, "add")}
        >
          <IoIosBasket size={20} />
        </button>
      ) : (
        <button
          className="px-[0.35rem] rounded-sm bg-gray-200 text-gray-700 hover:bg-gray-600 hover:text-gray-200"
          onClick={handleDelete}
        >
          <ImBin size={15} />
        </button>
      )}
    </div>
  );
};

export default HandleUserChoice;
