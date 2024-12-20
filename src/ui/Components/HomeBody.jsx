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
    <div className="h-full w-full flex dark:bg-black">
      <div className="h-[75%] flex flex-col items-center justify-center mt-10">
        <div className="w-10 mr-2 mt-2 text-xs">
          <div className="flex flex-col mx-auto w-full border rounded-md border-slate-300 dark:border-slate-500">
            <button className="py-2 text-md w-full border-b">1m</button>
            <button className="py-2 text-md w-full border-b">30</button>
            <button className="py-2 text-md w-full border-b">D</button>
            <button className="py-2 text-md w-full border-b">W</button>
            <button className="py-2 text-md w-full">M</button>
          </div>

          <div className="mt-5 flex flex-col mx-auto w-full border rounded-md border-slate-300 dark:border-slate-500">
            <button className="py-2 text-md w-full border-b">1m</button>
            <button className="py-2 text-md w-full border-b">30</button>
            <button className="py-2 text-md w-full border-b">D</button>
            <button className="py-2 text-md w-full border-b">W</button>
            <button className="py-2 text-md w-full">M</button>
          </div>

          <div className="mt-5 flex flex-col mx-auto w-full border rounded-md border-slate-300 dark:border-slate-500">
            <button className="py-2 text-md w-full border-b">1m</button>
            <button className="py-2 text-md w-full border-b">30</button>
            <button className="py-2 text-md w-full border-b">D</button>
            <button className="py-2 text-md w-full border-b">W</button>
            <button className="py-2 text-md w-full">M</button>
          </div>
        </div>
      </div>
      <div className="h-[75%] w-full">
        <CandlestickChart candles={candles} name={name} />
      </div>
    </div>
  );
};

export default HomeBody;
