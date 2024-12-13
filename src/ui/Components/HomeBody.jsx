import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CandlestickChart from "./CandlestickChart";
import { getCandleData } from "../../service/CandleService";

const HomeBody = () => {
  const stock = useSelector((store) => store.stockSlice);
  const [candles, setCandles] = useState([]);
  const [name, setName] = useState(stock);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCandleData(stock, "30minute");
      if (res.status == 200) {
        setCandles(res.data.candles);
        setName(res.data.name);
      }
    };

    fetchData();
  }, [stock]);

  return (
    <div className="flex bg-white dark:bg-black">
      <div className="w-16 mt-2 border-r border-slate-300 dark:border-slate-500">
        <div className="flex flex-col mx-auto w-full border-slate-300 dark:border-slate-500">
          <button className="py-2 text-md w-full">1m</button>
          <button className="py-2 text-md w-full">30</button>
          <button className="py-2 text-md w-full">D</button>
          <button className="py-2 text-md w-full">W</button>
          <button className="py-2 text-md w-full">M</button>
        </div>

        <div className="flex flex-col mx-auto w-full border-slate-300 dark:border-slate-500 mt-5">
          <button className="py-2 text-md w-full">1m</button>
          <button className="py-2 text-md w-full">30</button>
          <button className="py-2 text-md w-full">D</button>
          <button className="py-2 text-md w-full">W</button>
          <button className="py-2 text-md w-full">M</button>
        </div>
      </div>
      <div className="">
        <CandlestickChart candles={candles} name={name} />
      </div>
    </div>
  );
};

export default HomeBody;
