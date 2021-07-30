import { useState, useEffect } from "react";
import axios from "axios";

import OfferCard from "../components/OfferCard";
import Loader from "../components/Loader";

const Home = ({ apiUrl, data, setData, limit, setLimit, page, setPage }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/offers?sort=price-asc&page=1&limit=25`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        alert("An error occured while fetching the data");
      }
    };
    fetchData();
  }, [setData, apiUrl]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      <div className="offer-list">
        {data.offers ? (
          data.offers.map((offer) => {
            return <OfferCard offer={offer} key={offer._id} apiUrl={apiUrl} />;
          })
        ) : (
          <div className="loading-message">
            Aucun résultat pour votre recherche.
          </div>
        )}
      </div>

      <div className="page-nav">
        {page > 1 && (
          <span
            onClick={() => {
              setPage(page - 1);
              console.log(page);
            }}
          >
            ← Page précédente
          </span>
        )}
        <div className="product-limit">
          Résultats par page :
          <span
            onClick={() => {
              setLimit(10);
              console.log(page);
            }}
          >
            [10]
          </span>
          <span
            onClick={() => {
              setLimit(25);
              console.log(page);
            }}
          >
            [25]
          </span>
          <span
            onClick={() => {
              setLimit(50);
            }}
          >
            [50]
          </span>
        </div>
        {page * limit < data.count && (
          <span
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Page suivante →
          </span>
        )}
      </div>
    </div>
  );
};

export default Home;
