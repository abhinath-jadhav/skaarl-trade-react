import { useDispatch, useSelector } from "react-redux";
import { BsBarChartLineFill } from "react-icons/bs";
import { changeStock } from "../../../store/stockSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const WatchListCard = ({
  name,
  symbol,
  price,
  dateAdded,
  currentPrice,
  change,
  percentageChange,
  instrumentId,
}) => {
  const [pos, setPos] = useState(true);
  let date = dateAdded.substring(8, 10);
  let month = dateAdded.substring(5, 7);
  const curr = useSelector((state) => state.currentPriceSlice);
  const data = curr[instrumentId];
  const [show, setShow] = useState(false);

  const [socketStockData, setSocketStockData] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data != undefined && data != null) {
      setSocketStockData(data);

      if (socketStockData) {
        setPos(socketStockData.currentPrice >= price);
      } else {
        setPos(currentPrice >= price);
      }
      // This will update the state only when `data` changes
    } else {
      setPos(currentPrice >= price);
    }
  }, [data, socketStockData, pos, price, currentPrice]);

  const renderChart = (instrumentId) => {
    window.scrollTo(0, 0, { behavior: "smooth" });
    dispatch(changeStock(instrumentId));
    navigate(`/`);
  };

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="bg-white dark:bg-[#000000] flex items-center border-b border-slate-300 dark:border-slate-500 px-4 py-4 w-full"
    >
      <div className="w-3/5 flex items-center gap-2">
        <p className="text-sm font-semibold w-1/2">{symbol}</p>
        {/* <p className="text-sm text-nowrap overflow-hidden hover:overflow-visible hover:transition-colors hover:duration-300">
          {name}
        </p> */}
        <p className="text-xs w-1/2">
          at <span className="font-semibold">{price}</span> ({date}-{month})
        </p>
      </div>
      <div className="text-right w-2/5 flex justify-end items-end gap-1">
        <p className="font-semibold text-sm">
          {socketStockData ? socketStockData.currentPrice : currentPrice}
        </p>
        <div className="text-xs">
          <p className={`${pos ? "text-green-600" : "text-red-600"}`}>
            {socketStockData ? socketStockData.change : change} (
            {percentageChange}%)
          </p>
        </div>
        {show && (
          <div className="flex gap-2 text-slate-50">
            <button className="px-2 rounded-md bg-green-600 border border-green-600">
              Buy
            </button>
            <button className="px-2 rounded-md bg-red-600 border border-red-600">
              Buy
            </button>
            <button
              className="px-2 rounded-md bg-blue-600 border border-blue-600"
              onClick={() => renderChart(instrumentId)}
            >
              <BsBarChartLineFill size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchListCard;
