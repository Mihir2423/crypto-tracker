import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../context";
import Preloader from "../Components/chart_preloader";
import "./ChartPage.css";

function ChartPage() {
  const headTitleName = document.querySelector(
    ".responsive-table__head__title--name"
  );
  const headTitleStatus = document.querySelector(
    ".responsive-table__head__title--status"
  );
  const headTitleTypes = document.querySelector(
    ".responsive-table__head__title--types"
  );
  const headTitleUpdate = document.querySelector(
    ".responsive-table__head__title--update"
  );
  const headTitleCountry = document.querySelector(
    ".responsive-table__head__title--country"
  );

  // Select tbody text from Dom
  const bodyTextName = document.querySelectorAll(
    ".responsive-table__body__text--name"
  );
  const bodyTextStatus = document.querySelectorAll(
    ".responsive-table__body__text--status"
  );
  const bodyTextTypes = document.querySelectorAll(
    ".responsive-table__body__text--types"
  );
  const bodyTextUpdate = document.querySelectorAll(
    ".responsive-table__body__text--update"
  );
  const bodyTextCountry = document.querySelectorAll(
    ".responsive-table__body__text--country"
  );

  // Select all tbody table row from Dom
  const totalTableBodyRow = document.querySelectorAll(
    ".responsive-table__body .responsive-table__row"
  );

  // Get thead titles and append those into tbody table data items as a "data-title" attribute
  for (let i = 0; i < totalTableBodyRow.length; i++) {
    bodyTextName[i]?.setAttribute("data-title", headTitleName?.innerText);
    bodyTextStatus[i]?.setAttribute("data-title", headTitleStatus?.innerText);
    bodyTextTypes[i]?.setAttribute("data-title", headTitleTypes?.innerText);
    bodyTextUpdate[i]?.setAttribute("data-title", headTitleUpdate?.innerText);
    bodyTextCountry[i]?.setAttribute("data-title", headTitleCountry?.innerText);
  }
  const [preloader, setPreloader] = useState(false);
  useEffect(() => {
    setPreloader(true);
    setTimeout(() => {
      setPreloader(false);
    }, 2000);
  }, []);

  const [coins, setCoins] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [count, setCount] = React.useState(10);
  const { currency } = CryptoState();
  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency, count));
    setCoins(data);
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  React.useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
  const navigate = useNavigate();

  function nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  }
  const { symbol } = CryptoState();
  return (
    <>
      {preloader === true ? (
        <Preloader />
      ) : (
        <div className="chart_container">
          <div className="chart_search">
            <h1 className="chart_title">Search a Currency</h1>
            <form>
              <input
                className="input-search"
                type="text"
                placeholder="Type to search..."
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="container">
            <table className="responsive-table">
              {/* Responsive Table Body Section */}
              <thead className="responsive-table__head">
                <tr className="responsive-table__row">
                  <th className="responsive-table__head__title responsive-table__head__title--name">
                    CryptoCoin
                    <svg
                      version="1.1"
                      className="up-arrow"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                      style={{ enableBackground: "new 0 0 512 512" }}
                      xmlSpace="preserve"
                    >
                      <path d="M374.176,110.386l-104-104.504c-0.006-0.006-0.013-0.011-0.019-0.018c-7.818-7.832-20.522-7.807-28.314,0.002c-0.006,0.006-0.013,0.011-0.019,0.018l-104,104.504c-7.791,7.829-7.762,20.493,0.068,28.285    c7.829,7.792,20.492,7.762,28.284-0.067L236,68.442V492c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V68.442l69.824,70.162c7.792,7.829,20.455,7.859,28.284,0.067C381.939,130.878,381.966,118.214,374.176,110.386z" />
                    </svg>
                  </th>
                  <th className="responsive-table__head__title responsive-table__head__title--status">
                    Symbol
                  </th>
                  <th className="responsive-table__head__title responsive-table__head__title--types">
                    Current Price
                  </th>
                  <th className="responsive-table__head__title responsive-table__head__title--update">
                    Market Cap
                  </th>
                  <th className="responsive-table__head__title responsive-table__head__title--country">
                    Profit
                  </th>
                </tr>
              </thead>
              <tbody className="responsive-table__body">
                {filteredCoins.length !== 0 ? (
                  filteredCoins.map((coin) => {
                    return (
                      <tr
                        className="responsive-table__row"
                        onClick={() => navigate(`/chart/${coin.id}`)}
                      >
                        <td className="responsive-table__body__text responsive-table__body__text--name">
                          {coin.name}
                        </td>
                        <td className="responsive-table__body__text responsive-table__body__text--status">
                          <img
                            src={coin.image}
                            alt="crypto"
                            style={{ width: "30px" }}
                          />{" "}
                          &nbsp;
                          {coin.symbol}
                        </td>
                        <td className="responsive-table__body__text responsive-table__body__text--types">
                          {symbol}
                          {nFormatter(coin.current_price)}
                        </td>
                        <td className="responsive-table__body__text responsive-table__body__text--update">
                          {symbol}
                          {nFormatter(coin.market_cap)}
                        </td>
                        <td
                          className={
                            coin.price_change_percentage_24h < 0
                              ? " red responsive-table__body__text responsive-table__body__text--country"
                              : "green responsive-table__body__text responsive-table__body__text--country"
                          }
                        >
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <h1>Nothing Found</h1>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default ChartPage;
