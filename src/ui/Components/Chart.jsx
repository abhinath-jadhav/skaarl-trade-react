import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CandlestickChart from "./CandlestickChart";
import { getCandleData } from "../../service/CandleService";
import Loader from "./Loader";
import { NoData } from "../pages";

const Chart = () => {
  const stock = useSelector((store) => store.stockSlice);
  const [candles, setCandles] = useState([]);
  const [name, setName] = useState(stock);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCandleData(stock, "30minute");
      if (res.status == 200) {
        setCandles(res.data.candles);
        setName(res.data.name);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [stock]);
  if (isLoading) return <Loader height="h-[700px]" />;
  return (
    <>
      {candles.length != 0 ? (
        <div className="h-full bg-white ">
          <div className="h-full w-full md:flex bg-white border p-2 dark:bg-black">
            <div className="md:h-[75%] hidden md:flex flex-col items-center justify-center mt-10">
              <div className="flex md:flex-col w-10 mr-2 mt-2 text-xs">
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
            <div className="h-[85%] md:h-[95%] w-full">
              <CandlestickChart candles={candles} name={name} />
            </div>
            <div className="md:hidden flex-col items-center justify-center mt-5 text-sm">
              <div className="flex gap-2 mx-auto w-full border rounded-md border-slate-300 dark:border-slate-500">
                <button className="py-2 text-md w-full border-r">1m</button>
                <button className="py-2 text-md w-full border-r">30</button>
                <button className="py-2 text-md w-full border-r">D</button>
                <button className="py-2 text-md w-full border-r">W</button>
                <button className="py-2 text-md w-full">M</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoData message={"Something went wrong. Unable to fetch data !!!"} />
      )}
    </>
  );
};

export default Chart;
