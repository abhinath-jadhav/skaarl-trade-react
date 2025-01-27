import { useEffect, useState } from "react";
import {
  getWatchlist,
  getWatchlistChanged,
} from "../../../service/WatchlistService.js";
import WatchListCard from "../cards/WatchListCard.jsx";
import CurrentPriceFeed from "../CurrentPriceFeed.jsx.jsx";
import Swal from "sweetalert2";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  const fetchdata = async () => {
    const response = await getWatchlist();
    if (response != null && response.status == 200) {
      setWatchlist(response.data);
    }

    const fetchChangedData = async () => {
      const response = await getWatchlistChanged();

      if (response != null && response.status == 200) {
        setWatchlist(response.data);
      }
    };

    fetchChangedData();
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  return (
    <div>
      <div className="scrollbar-hide my-auto">
        {watchlist.length > 0 ? (
          watchlist.map((stock) => (
            <div
              key={stock.id}
              onMouseEnter={() => handleMouseEnter(stock.id)}
              onMouseLeave={handleMouseLeave}
            >
              <WatchListCard
                {...stock}
                handleRefresh={fetchdata}
                show={hoveredId == stock.id}
              />
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
