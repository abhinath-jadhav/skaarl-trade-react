import Watchlist from "./Watchlist";

const HomeSideBar = () => {
  return (
    <div className="h-[85.6vh] md:h-[84.7vh] 2xl:h-[84vh] bg-white dark:bg-black w-full overflow-y-auto scrollbar-hide border border-r-0 border-slate-300 dark:border-slate-500 relative">
      <div className="sticky top-0 bg-white dark:bg-black">
        <div className="px-2 py-2">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-2 py-1 rounded-md mt-1 bg-slate-100 dark:bg-[#151e28]  text-black dark:text-white
                      focus:outline-none focus:ring-1 focus:ring-[#151e28] focus:border-transparent dark:focus:ring-slate-500"
          />
        </div>
        <div className="flex gap-2 text-xs font-normal justify-between px-2 mt-3 pb-2 border-b border-slate-300 dark:border-slate-500">
          <button>MY STOCKS</button>
          <button>WATCHLIST 1</button>
          <button>WATCHLIST 2</button>
          <button>NIFTY 50</button>
        </div>
      </div>
      <div className="">
        <Watchlist />
      </div>
    </div>
  );
};

export default HomeSideBar;
