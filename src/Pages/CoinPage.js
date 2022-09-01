import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Chart from "../Components/Chart"
import Single from "../Components/Single"
import { SingleCoin } from "../config/api"
import { CryptoState } from "../context"
export default function CoinPage() {

    const { id } = useParams()
    const [coin, setCoin] = useState()
    const { currency } = CryptoState()
    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id))
        setCoin(data)
    }
    useEffect(() => {
        fetchCoin()
    }, [])
    return (
        <div className="single-coin-container">
            <Single
                key={id}
                image={coin?.image.large}
                name={coin?.name}
                rank={coin?.market_cap_rank}
                price={coin?.market_data.current_price[currency.toLowerCase()]}
                description={coin?.description.en.split(". ")[0]}
            />
            <hr />
            <Chart
                coin={coin}
                id={id}
            />
        </div>
    )
}