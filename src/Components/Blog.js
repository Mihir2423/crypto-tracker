import React from "react";
export default function Blog(props) {
  return (
    <a href={props.url} target="_blank" rel="noreferrer">
      <div className="_blog">
        <div className="blog_header">
          <h1>{props.name}</h1>
          <img src={props.main_image} alt="noimage" />
        </div>
        <p>{props.description}</p>
        <div className="blog_footer">
          <img src={props.provider_image} alt="noOne" />
          <p>{props.date}</p>
        </div>
      </div>
    </a>
  );
}
