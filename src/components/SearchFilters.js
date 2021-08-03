import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

import PriceSwitch from "./search-filters/PriceSwitch";
import PriceSlider from "./search-filters/PriceSlider";

const SearchFilters = ({ apiUrl, setData, limit, page }) => {
  const [searchInput, setSearchInput] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);
  const [sort, setSort] = useState("price-asc");

  const location = useLocation();

  // API request
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/offers?title=${searchInput}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sort}&page=${page}&limit=${limit}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        alert("An error occured while fetching the data");
      }
    };
    fetchData();
  }, [apiUrl, searchInput, priceMin, priceMax, sort, setData, limit, page]);

  return isLoading ? (
    <div className="container loading-message">En cours de chargement...</div>
  ) : (
    <div className="container-search-bar">
      <div className="search-bar">
        <FontAwesomeIcon icon="search" />
        <input
          type="search"
          placeholder="Rechercher des articles"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>
      {location.pathname === "/" && (
        //   Filters hidden when not on path "/"
        <div className="filters">
          <PriceSwitch setSort={setSort} />
          <PriceSlider setPriceMin={setPriceMin} setPriceMax={setPriceMax} />
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
