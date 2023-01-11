import React from "react";
import { CryptoState } from "../context";
export default function Coin(props) {
  const { symbol } = CryptoState();

  function nFormatter(num) {
    if (num >= 1000000000) {
       return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
       return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
       return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}

  return (
    <div className="coin__container">
      <div className="coin__row" onClick={props.onClick}>
        <div className="coin_">
          <img src={props.image} alt="crypto" />
          <h1>{props.name}</h1>
          <p className="coin__symbol">{props.symbol}</p>
        </div>
        <div className="coin__data">
          <p className="coin__price">
            {symbol}
            {props.price.toLocaleString()}
          </p>
          <p className="coin__volume">
            {symbol}
            {nFormatter(props.volume)}
          </p>

          {props.priceChange < 0 ? (
            <p className="coin__percent red">{props.priceChange.toFixed(2)}%</p>
          ) : (
            <p className="coin__percent green">
              {props.priceChange.toFixed(2)}%
            </p>
          )}

          <p className="coin__marketcap">
            Mkt Cap: {symbol}
            {nFormatter(props.marketcap)}
          </p>
        </div>
      </div>
    </div>
  );
}
