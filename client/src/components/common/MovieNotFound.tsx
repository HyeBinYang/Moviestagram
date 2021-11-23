import React from "react";
import "./MovieNotFound.css";

export default function MovieNotFound() {
  return (
    <div id="movieNotFound">
      <img src={`${process.env.PUBLIC_URL}/img/notfound.png`} alt="not found" />
      <p>404 NOT FOUND</p>
      <p>해당 영화는 존재하지 않아요.</p>
    </div>
  );
}
