import { MenuItem, Select } from "@mui/material"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { CryptoState } from "../context"
import logo from "../Images/logo.png"

export default function Header() {
    const { currency, setCurrency } = CryptoState()
    const navigate = useNavigate();
    const onBackClick = e => {
        e.preventDefault()
        navigate("/crypto-tracker")
    }
    return (
        <div className="header_container">
            <div className="logo">
                <img src={logo} alt="LOGO" />
                <h1 onClick={onBackClick} >Crypto Tracker</h1>
            </div>
            <nav className="header_nav">
                <ul>
                    <li>
                        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>Home</Link>
                    </li>
                    <li>
                        <Link to="/chart" style={{ textDecoration: "none", color: "inherit" }}>Chart</Link>
                    </li>
                    <li>
                        <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>Blog</Link>
                    </li>
                    <li>

                        <Select
                            style={{
                                height: 60,
                                color: "white",
                                border: "2px solid #4362ed",
                                backgroundColor: "#4362ed"
                            }}
                            icon={{ fill: "white" }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={"INR"}>INR</MenuItem>
                            <MenuItem value={"USD"}>USD</MenuItem>
                        </Select>
                    </li>
                </ul>

            </nav>
        </div>
    )
}