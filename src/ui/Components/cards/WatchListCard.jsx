import { useDispatch, useSelector } from "react-redux";
import { changeStock } from "../../../store/stockSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HandleUserChoice from "../buttons/HandleUserChoice";

/* eslint-disable react/prop-types */
const WatchListCard = ({
  symbol,
  price,
  dateAdded,
  currentPrice,
  change,
  percentageChange,
  instrumentKeyUpStox,
  instrumentKeyFivePaisa,
  instrumentName,
}) => {
  const [pos, setPos] = useState(true);
  let date = dateAdded.substring(8, 10);
  let month = dateAdded.substring(5, 7);
  const curr = useSelector((state) => state.currentPriceSlice);
  const data = curr[instrumentKeyUpStox];
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

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="relative bg-white dark:bg-[#000000] flex items-center border-b border-slate-300 dark:border-slate-500 
                px-4 py-3 w-full"
    >
      <div className="w-3/4 flex items-center gap-2">
        <div className="w-2/4">
          <p className="text-xs font-semibold">{symbol}</p>
          <p className="text-[0.7rem] mt-1">{instrumentName}</p>
        </div>

        <p className=" w-2/4 text-xs">
          added at <span className="font-semibold">{price}</span> ({date}-
          {month})
        </p>
      </div>
      <div className="w-1/4 text-right gap-1">
        {show ? (
          <div className="absolute top-1/4  right-2 bg-white p-1 px-2 border-red-500">
            <HandleUserChoice instrumentKeyUpStox={instrumentKeyUpStox} />{" "}
          </div>
        ) : (
          <>
            <p className="font-semibold text-xs">
              {socketStockData ? socketStockData.currentPrice : currentPrice}
            </p>
            <div className="text-xs mt-1">
              <p className={`${pos ? "text-green-600" : "text-red-600"}`}>
                {socketStockData ? socketStockData.change : change} (
                {percentageChange}%)
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WatchListCard;
