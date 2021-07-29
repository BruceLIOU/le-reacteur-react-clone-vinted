import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchFilters = ({ apiUrl, setData, limit, page }) => {
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState("price-asc");

  // API request
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/offers?title=${searchInput}&sort=${sort}&page=${page}&limit=${limit}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        alert("An error occured while fetching the data");
      }
    };
    fetchData();
  }, [apiUrl, searchInput, sort, setData, limit, page]);

  return isLoading ? (
    <div className="container loading-message">En cours de chargement...</div>
  ) : (
    <div>
      <div className="search-bar">
        <FontAwesomeIcon icon="search" />
        <input
          type="search"
          placeholder="Rechercher des articles"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchFilters;
