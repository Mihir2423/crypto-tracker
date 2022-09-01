import axios from "axios"
import React, { useState } from "react"
import { TrendingCoins } from "../config/api"
import { CryptoState } from "../context"
import Box from "./Box"


export default function Banner() {
    const [trending, setTrending] = useState([])
    const {currency} = CryptoState()
    const fetchTrendingcoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }
    React.useEffect(() => {
        fetchTrendingcoins()
    }, [currency])



    const items = trending.map(card => (
        <Box
            key={card.id}
            image={card.image}
            name = {card.id}
        />
    ))
    return (
        <div className="card-container">
            {items}
        </div>
    )
}