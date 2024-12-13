import { useEffect, useState } from "react";
import {
  getWatchlist,
  getWatchlistChanged,
} from "../../../service/WatchlistService.js";
import WatchListCard from "../cards/WatchListCard.jsx";
import CurrentPriceFeed from "../CurrentPriceFeed.jsx.jsx";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await getWatchlist();
      if (response != null && response.status == 200) {
        setWatchlist(response.data);
      }

      const fetchChangedData = async () => {
        const response = await getWatchlistChanged();
        console.log(response);

        if (response != null && response.status == 200) {
          setWatchlist(response.data);
        }
      };

      fetchChangedData();
    };

    fetchdata();
  }, []);
  return (
    <div>
      <div className="scrollbar-hide my-auto">
        {watchlist.length > 0 ? (
          watchlist.map((stock) => (
            <div key={stock.id}>
              <WatchListCard {...stock} />
              <WatchListCard {...stock} />
              <WatchListCard {...stock} />

              <WatchListCard {...stock} />
              <WatchListCard {...stock} />
              <WatchListCard {...stock} />
              <WatchListCard {...stock} />
              <WatchListCard {...stock} />
              <WatchListCard {...stock} />
              <WatchListCard {...stock} />
              <WatchListCard {...stock} />
              <WatchListCard {...stock} />
            </div>
          ))
        ) : (
          <p>No items in the watchlist.</p>
        )}
      </div>
      {localStorage.getItem("access_token") && <CurrentPriceFeed />}
    </div>
  );
};

export default Watchlist;
