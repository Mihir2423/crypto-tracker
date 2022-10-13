import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Coin from "../Components/Coin"
import { CoinList } from "../config/api"
import { CryptoState } from "../context"
import Preloader from "../Components/chart_preloader"


export default function ChartPage() {
  const [preloader, setPreloader] = useState(false)
  useEffect(() => {
    setPreloader(true)
    setTimeout(() => {
      setPreloader(false)
    }, 2000);
  }, [])

  const [coins, setCoins] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [count, setCount] = React.useState(10)
  const { currency } = CryptoState()
  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency,count))
    setCoins(data)
  }
  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  React.useEffect(() => {
    fetchCoins()
  }, [currency])

  const navigate = useNavigate();
  return (
    <>
    {preloader === true ? <Preloader /> :
    <div className="chart_container">
      <div className="chart_search">
        <h1 className="chart_title">Search a Currency</h1>
        <form>
          <input className="input-search" type="text" placeholder="Type to search..." onChange={handleChange} />
        </form>
      </div>
      <div className="chart_coin_container">
        {filteredCoins.map(coin => {
          return (
            <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
            onClick = {() => navigate(`/chart/${coin.id}`)}
            />
            );
          })}
      </div>
    </div>}
          </>
  )
}