import { PiChartLineUp } from "react-icons/pi";
import { IoIosBasket } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeStock } from "../../../store/stockSlice";
import { addToWatchList } from "../../../service/WatchlistService";
import Swal from "sweetalert2";

const HandleUserChoice = ({ instrumentKeyUpStox, isSearch, symbol }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderChart = (instrumentKeyUpStox) => {
    window.scrollTo(0, 0, { behavior: "smooth" });
    dispatch(changeStock(instrumentKeyUpStox));
    navigate(`/`);
  };

  const watchlistHandler = async (sym) => {
    const res = await addToWatchList(sym);
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
    <div className="flex gap-2 text-slate-50 font-semibold">
      <button
        className="px-2 py-1 rounded-sm text-green-700 bg-green-200 
             hover:text-green-200 hover:bg-green-600
            "
      >
        B
      </button>
      <button className="px-2 py-1 rounded-sm text-red-700 bg-red-200 hover:text-red-200 hover:bg-red-600">
        S
      </button>
      <button
        className="px-1 rounded-sm bg-blue-200 text-blue-700 hover:bg-blue-600 hover:text-blue-200"
        onClick={() => renderChart(instrumentKeyUpStox)}
      >
        <PiChartLineUp size={20} />
      </button>
      {isSearch && (
        <button
          className="px-1 rounded-sm bg-gray-200 text-gray-700 hover:bg-gray-600 hover:text-gray-200"
          onClick={() => watchlistHandler(symbol)}
        >
          <IoIosBasket size={20} />
        </button>
      )}
    </div>
  );
};

export default HandleUserChoice;
