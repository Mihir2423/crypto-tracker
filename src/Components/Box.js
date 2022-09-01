import React from "react"

export default function Box(props) {
    return (
        <div className="Card">
            <img src={props.image} alt="IMG"/>
            <h1>{props.name}</h1>
        </div>
    )
}