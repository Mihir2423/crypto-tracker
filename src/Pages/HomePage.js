import React from "react"
import image from "../Images/background_img.jpg"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
    const navigate = useNavigate()
    const onClick  = (e) => {
        e.preventDefault()
        navigate("/chart")
    }
    return (
        <div className="HomePage">
            <div className="back">
                <svg viewBox="0 0 1440 363" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path d="M1440 27.4774C1352.73 19.8184 1122.41 49.0556 899.331 227.276C620.48 450.052 354.282 355.647 170.328 185.318C23.165 49.0556 -4.21721 8.32998 0.487081 5"
                        initial={{ strokeOpacity: 0, pathLength: 0, pathOffset: 1 }}
                        animate={{ strokeOpacity: 0.5, pathLength: 1, pathOffset: 0 }}
                        transition={{ duration: 2 }}
                        stroke="#00FFCB" strokeOpacity="0.1" strokeWidth="10" />
                </svg>
            </div>
            <div className="homepage_content">
                <div className="left"
                >
                    <h1>CRYPTOCURRENCY</h1>
                    <h3 className="bouncing-letters"
                    >
                        <span>L</span>
                        <span>A</span>
                        <span>N</span>
                        <span>D</span>
                        <span>I</span>
                        <span>N</span>
                        <span>G</span>
                        <span>&nbsp;&nbsp;</span>
                        <span>P</span>
                        <span>A</span>
                        <span>G</span>
                        <span>E</span>
                    </h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Quis tempora ducimus inventore vero facere molestias ipsam consectetur
                        rerum hic debitis, quas, odit laboriosam perferendis, nisi ad quisquam velit ut dignissimos.
                    </p>
                    <button className="button" type="button" onClick={onClick} >Get Started! </button>
                </div>
                <img src={image} alt="something" />
            </div>
        </div>
    )
}