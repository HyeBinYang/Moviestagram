import React, { useState } from "react";
import "./Navbar.css";
import { Link, useHistory, useLocation } from "react-router-dom";

export default function Navbar() {
  const history = useHistory();
  const location = useLocation();
  const [movieInput, setMovieInput] = useState("");

  return (
    <nav id="navbar">
      <Link className="navbar__logo" to="/">
        Moviestagram
      </Link>
      <input
        onChange={(e) => {
          setMovieInput(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            history.push({
              pathname: "/search",
              search: `?movie=${movieInput}`,
            });
          }
        }}
        className="navbar__search"
        type="text"
        placeholder="영화검색"
      />
      <ul className="navbar__menu">
        <li className="menu">
          <Link to="/">
            <i className="fas fa-home"></i>
          </Link>
        </li>
        <li className="menu">
          <Link
            to={{
              pathname: "/write",
              state: { background: location },
            }}
          >
            <i className="fas fa-pen"></i>
          </Link>
        </li>
        <li className="menu">
          <i className="far fa-heart"></i>
        </li>
      </ul>
    </nav>
  );
}
