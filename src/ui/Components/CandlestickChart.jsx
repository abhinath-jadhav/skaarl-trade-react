/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { useSelector } from "react-redux";

const CandlestickChart = ({ candles, name }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  const [hoveredCandle, setHoveredCandle] = useState({});

  const theme = useSelector((state) => state.themeSlice);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    if (candles != null) {
      const data = candles[candles.length - 1];
      if (data) {
        setHoveredCandle({
          open: data[1],
          high: data[2],
          low: data[3],
          close: data[4],
        });
      }
    }
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: theme ? { color: "#000000" } : { color: "#ffffff" },
        textColor: theme ? "#FFFFFF" : "#000000",
      },
      grid: {
        vertLines: theme
          ? { color: "rgba(255, 255, 255, 0.2)" }
          : { color: "#e8e8e8" },
        horzLines: theme
          ? { color: "rgba(255, 255, 255, 0.1)" }
          : { color: "#e8e8e8" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        mode: CrosshairMode.Normal, // Allow crosshair to move freely
      },
    });

    chartRef.current = chart;

    const candleSeries = chart.addCandlestickSeries();

    // Convert ISO strings to UTC Unix timestamps
    const convertToUnixTimestamp = (isoString) => {
      return Math.floor(new Date(isoString).getTime() / 1000 + 19800);
    };

    // Map candle data to required format
    const candleData = candles.map((d) => ({
      time: convertToUnixTimestamp(d[0]),
      open: d[1],
      high: d[2],
      low: d[3],
      close: d[4],
    }));

    candleSeries.setData(candleData);
    const calculateSMA = (data, period) => {
      return data
        .map((d, index) => {
          if (index < period - 1) return null;
          const slice = data.slice(index - period + 1, index + 1);
          const sum = slice.reduce((acc, cur) => acc + cur.close, 0);
          return { time: d.time, value: sum / period };
        })
        .filter((d) => d !== null);
    };

    // Calculate the SMA with a period of 10
    const smaData = calculateSMA(candleData, 44);

    const smaLineSeries = chart.addLineSeries({
      color: theme ? "#FFA500" : "#FF8C00", // Orange color for SMA line
      lineWidth: 2,
    });
    smaLineSeries.setData(smaData);

    // Update hoveredCandle state on crosshair move
    chart.subscribeCrosshairMove((param) => {
      if (
        param === undefined ||
        param.time === undefined ||
        param.seriesData.size === 0
      ) {
        if (candles != null) {
          const data = candles[candles.length - 1];
          if (data) {
            setHoveredCandle({
              open: data[1],
              high: data[2],
              low: data[3],
              close: data[4],
            });
          }
        }
        return;
      }

      const data = param.seriesData.get(candleSeries);
      if (data) {
        setHoveredCandle({
          open: data.open,
          high: data.high,
          low: data.low,
          close: data.close,
        });
      }
    });

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    };

    const debouncedResize = debounce(handleResize, 100);
    window.addEventListener("resize", debouncedResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", debouncedResize);
      chart.remove();
    };
  }, [candles, theme]);

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  return (
    <div className="mx-auto pb-8 flex justify-center">
      {/* Display the open, high, low, and close values at the top */}
      <div className="">
        <div
          className={`mb-2 font-medium text-sm pl-4 w-fit py-2 bg-white dark:bg-black `}
        >
          {hoveredCandle && (
            <div
              className={`flex justify-center items-center gap-2 ${
                hoveredCandle.open >= hoveredCandle.close
                  ? "text-red-600"
                  : "text-green-700"
              }`}
            >
              <p
                className={`${
                  theme ? "text-white" : "text-black"
                } font-semibold text-base`}
              >
                {name}
              </p>
              <p>
                <span className="dark:text-white text-black">O </span>
                {hoveredCandle.open}
              </p>
              <p>
                <span className="dark:text-white text-black">H </span>
                {hoveredCandle.high}
              </p>
              <p>
                <span className="dark:text-white text-black">L </span>
                {hoveredCandle.low}
              </p>
              <p>
                <span className="dark:text-white text-black">C </span>
                {hoveredCandle.close}
              </p>

              <p
                className={`${
                  hoveredCandle.open >= hoveredCandle.close
                    ? "text-red-600"
                    : "text-green-700"
                }`}
              >
                {Math.abs(
                  ((hoveredCandle.open - hoveredCandle.close) / 100).toFixed(2)
                )}
                %
              </p>
            </div>
          )}
        </div>
        <div
          ref={chartContainerRef}
          className="min-w-full overflow-hidden bg-slate-100 dark:bg-[#151e28] "
        />
      </div>
    </div>
  );
};

export default CandlestickChart;
