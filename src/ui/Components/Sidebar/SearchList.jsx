import React, { useEffect, useState } from "react";
import { search } from "../../../service/SearchService";
import SearchCard from "../cards/SearchCard";

const SearchList = ({ query }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    performSearch();
  }, [query]);

  const performSearch = async () => {
    const response = await search(query);
    if (response.status === 200) {
      setResults(response.data);
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      {results.length != 0 ? (
        <div>
          {results.map((res) => (
            <div key={res.id}>
              <SearchCard {...res} />
            </div>
          ))}
        </div>
      ) : (
        <div>No result found</div>
      )}
    </div>
  );
};

export default SearchList;
