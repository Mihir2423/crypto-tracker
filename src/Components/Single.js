import React from "react"
import { CryptoState } from "../context"
import parse from "html-react-parser"

export default function Single(props) {
    const { symbol } = CryptoState()
    return (

            <div className="single_container_left">
                <img src={props.image} alt="noImage" />
                <h1>{props.name}</h1>
                <p>{parse(`${props.description}`)}.</p>
                <h1>Rank : {props.rank}</h1>
                <h1>Price : {symbol}{props.price}</h1>
            </div>
           
    )
}