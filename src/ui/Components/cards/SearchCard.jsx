import { useDispatch, useSelector } from "react-redux";
import { changeStock } from "../../../store/stockSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HandleUserChoice from "../buttons/HandleUserChoice";

/* eslint-disable react/prop-types */
const SearchCard = ({
  symbol,
  currentPrice,
  instrumentKeyUpStox,
  instrumentName,
}) => {
  const curr = useSelector((state) => state.currentPriceSlice);
  const data = curr[instrumentKeyUpStox];
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderChart = (instrumentKeyUpStox) => {
    window.scrollTo(0, 0, { behavior: "smooth" });
    dispatch(changeStock(instrumentKeyUpStox));
    navigate(`/`);
  };

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="bg-white dark:bg-[#000000] flex items-center border-b border-slate-300 dark:border-slate-500 px-4 py-2 w-full"
    >
      <div className="w-3/5 flex flex-col items gap-2">
        <p className="text-xs font-semibold w-1/2">{symbol}</p>
        <p>{instrumentName}</p>
      </div>
      <div className="text-right w-2/5 flex justify-end items-end gap-1">
        <p className="font-semibold text-sm">{currentPrice}</p>

        {show && (
          <HandleUserChoice
            instrumentKeyUpStox={instrumentKeyUpStox}
            isSearch={true}
            symbol={symbol}
          />
        )}
      </div>
    </div>
  );
};

export default SearchCard;
