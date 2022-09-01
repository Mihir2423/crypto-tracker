import React from "react"
import { CryptoState } from "../context";
export default function Coin(props) {
  const { symbol } = CryptoState()
  
    return (
        <div className='coin__container'>
          <div className='coin__row' onClick={props.onClick} >
            <div className='coin_'>
              <img src={props.image} alt='crypto' />
              <h1>{props.name}</h1>
              <p className='coin__symbol'>{props.symbol}</p>
            </div>
            <div className='coin__data'>
              <p className='coin__price'>{symbol}{props.price.toLocaleString()}</p>
              <p className='coin__volume'>{symbol}{props.volume.toLocaleString()}</p>
    
              {props.priceChange < 0 ? (
                <p className='coin__percent red'>{props.priceChange.toFixed(2)}%</p>
              ) : (
                <p className='coin__percent green'>{props.priceChange.toFixed(2)}%</p>
              )}
    
              <p className='coin__marketcap'>
                Mkt Cap: {symbol}{props.marketcap.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      );
}