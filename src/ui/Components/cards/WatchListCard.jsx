import { useDispatch, useSelector } from "react-redux";
import { changeStock } from "../../../store/stockSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HandleUserChoice from "../buttons/HandleUserChoice";
import OrderModal from "../modal/OrderModal";
import { placeOrder } from "../../../service/OrderService";

/* eslint-disable react/prop-types */
const WatchListCard = ({
  id,
  symbol,
  price,
  dateAdded,
  currentPrice,
  change,
  percentageChange,
  instrumentKeyUpStox,
  instrumentName,
  handleRefresh,
}) => {
  const [pos, setPos] = useState(true);
  let date = dateAdded.substring(8, 10);
  let month = dateAdded.substring(5, 7);
  const curr = useSelector((state) => state.currentPriceSlice);
  const data = curr[instrumentKeyUpStox];
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [socketStockData, setSocketStockData] = useState(null);

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

  const handleOrder = (action) => {
    setAction(action);
    setIsModalOpen(true);
  };

  const handleModalState = (data) => {
    setShow(false);
    setIsModalOpen(data);
  };

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
        {show && !isModalOpen ? (
          <div className="absolute top-1/4  right-2 bg-white p-1 px-2 border-red-500 dark:bg-black">
            <HandleUserChoice
              instrumentKeyUpStox={instrumentKeyUpStox}
              symbol={symbol}
              id={id}
              handleRefresh={handleRefresh}
              handleOrder={handleOrder}
            />{" "}
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
      {isModalOpen && (
        <OrderModal
          symbol={symbol}
          setIsModalOpen={handleModalState}
          type={action}
          price={230}
          stoploss={230 * 0.05}
        />
      )}
    </div>
  );
};

export default WatchListCard;
