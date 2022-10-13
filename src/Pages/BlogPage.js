import axios from "axios"
import moment from "moment";
import React, { useEffect, useState } from "react"
import Blog from "../Components/Blog"
import { CoinList } from "../config/api";
import { CryptoState } from "../context";
import Preloader from "../Components/preloader"

export default function BlogPage() {
    const [preloader, setPreloader] = useState(false)
  useEffect(() => {
    setPreloader(true)
    setTimeout(() => {
      setPreloader(false)
    }, 1500);
  }, [])
    const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
    const [newsCategory, setNewsCategory] = React.useState('Cryptocurrency');
    const [news, setNews] = React.useState([])
    const options = {
        method: 'GET',
        url: `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&safeSearch=Off`,
        params: { safeSearch: 'Off', textFormat: 'Raw' },
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Key': '4ff4ac9c02mshaab61d445c4c199p1a0808jsn49877f43f632',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
    };
    React.useEffect(() => {
        axios.request(options).then(function (response) {
            setNews(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }, [newsCategory])
    console.log(news)
    const blog = news.value?.map(box => {
        return (
            <Blog
                key={box.name}
                name={box.name>50?`${box.name.substring(0,50)}...`: box.name}
                description={box.description.length>150?`${box.description.substring(0,150)}...`: box.description}
                main_image = {box?.image?.thumbnail?.contentUrl || demoImage}
                provider_image = {box.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
                date = {moment(box.datePublished).startOf('ss').fromNow()}
            />
        )
    })
    const { currency } = CryptoState()
    const [coins, setCoins] = React.useState([])
    const fetchcoinsnews = async () => {
        const { data } = await axios.get(CoinList(currency,100))
        setCoins(data)
    }
    React.useEffect(() => {
        fetchcoinsnews()
    }, [currency])
    return (
        <>
        {preloader === true ? <Preloader /> :
        <div className="_blogContainer">
            <h1 className="_title">Get Latest Crypto News</h1>
            <select id="input" value={news.name}
                onChange={(e) => setNewsCategory(e.target.value)}>
                {coins.map((option) => {
                    return (<option key={option.id} value={option.id}>{option.name}</option>
                    )
                })}
            </select>
            <div className="blog_card">
                {blog}
            </div>
        </div>
        }
                </>
    )
}