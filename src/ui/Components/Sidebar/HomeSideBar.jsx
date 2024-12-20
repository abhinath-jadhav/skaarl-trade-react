import { useEffect, useRef, useState } from "react";
import Watchlist from "./Watchlist";
import { search } from "../../../service/SearchService";
import SearchList from "./SearchList";
import { RxCross2 } from "react-icons/rx";

const HomeSideBar = () => {
  const [query, setQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (query.length < 3) {
      setIsSearch(false);
      return;
    } else {
      ref.current = setTimeout(() => {
        setIsSearch(true);
      }, 500);
    }
    return () => clearTimeout(ref.current);
  }, [query]);

  return (
    <div
      className="h-full text-[10px] md:text-xs bg-white dark:bg-black w-full overflow-y-auto 
                scrollbar-hide border border-r-0 border-slate-300 dark:border-slate-500 relative"
    >
      <div className="sticky top-0 bg-white dark:bg-black">
        <div className="px-4 py-2 relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-full px-2 py-2 text-[12px] md:text-xs rounded-md mt-1 bg-slate-100 dark:bg-[#151e28]  text-black dark:text-white
                      focus:outline-none focus:ring-1 focus:ring-[#3f5267] focus:border-transparent dark:focus:ring-slate-500"
          />
          {query != "" && (
            <div
              className="absolute top-1/3 right-6 text-gray-400 cursor-pointer"
              onClick={() => setQuery("")}
            >
              <RxCross2 size={20} />
            </div>
          )}
        </div>
        <div
          className="flex gap-2 text-[10px] md:text-xs font-normal justify-between px-4 mt-1 md:mt-3 pb-2 border-b
          border-slate-300 dark:border-slate-500"
        >
          <button>MY STOCKS</button>
          <button>WATCHLIST 1</button>
          <button>WATCHLIST 2</button>
        </div>
      </div>
      <div className="">
        {isSearch ? <SearchList query={query} /> : <Watchlist />}
      </div>
    </div>
  );
};

export default HomeSideBar;
