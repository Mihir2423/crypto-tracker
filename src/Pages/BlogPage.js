import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Blog from "../Components/Blog";
import { CoinList } from "../config/api";
import { CryptoState } from "../context";
import Preloader from "../Components/blog_preloader";

export default function BlogPage() {
  const [preloader, setPreloader] = useState(false);
  useEffect(() => {
    setPreloader(true);
    setTimeout(() => {
      setPreloader(false);
    }, 2500);
  }, []);
  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
  const [newsCategory, setNewsCategory] = React.useState("Cryptocurrency");
  const [news, setNews] = React.useState([]);
  
  const options = {
    method: "GET",
    url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI",
    params: {
      q: `${newsCategory}`,
      pageNumber: "1",
      pageSize: "10",
      autoCorrect: "true",
      fromPublishedDate: "null",
      toPublishedDate: "null",
    },
    headers: {
      "X-RapidAPI-Key": "4ff4ac9c02mshaab61d445c4c199p1a0808jsn49877f43f632",
      "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
    },
  };
  React.useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.value);
        setNews(response.data.value)
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [newsCategory]);
  console.log(news);

  const { currency } = CryptoState();
  const [coins, setCoins] = React.useState([]);
  const fetchcoinsnews = async () => {
    const { data } = await axios.get(CoinList(currency, 100));
    setCoins(data);
  };
  React.useEffect(() => {
    fetchcoinsnews();
  }, [currency]);
  return (
    <>
      {preloader === true ? (
        <Preloader />
      ) : (
        <div className="_blogContainer">
          <h1 className="_title">Get Latest Crypto News</h1>
          <select
            id="input"
            value={news.name}
            onChange={(e) => setNewsCategory(e.target.value)}
          >
            {coins.map((option) => {
              return (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              );
            })}
          </select>
          <div className="blog_card">{
            news?.map((box) => {
                return (
                  <Blog
                    key={box.body}
                    name={box.title > 50 ? `${box.title.substring(0, 50)}...` : box.title}
                    description={
                      box.description.length > 150
                        ? `${box.description.substring(0, 150)}...`
                        : box.description
                    }
                    main_image={box?.image?.url || demoImage}
                    provider_image={
                      box.provider[0]?.image?.thumbnail?.contentUrl || demoImage
                    }
                    url = {box?.url}
                    date={moment(box.datePublished).startOf("ss").fromNow()}
                  />
                );
              })
          }</div>
        </div>
      )}
    </>
  );
}
