import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const history = useHistory();
  const location = useLocation();
  const [movieInput, setMovieInput] = useState("");

  const searchMovie = (e) => {
    if (e.key === "Enter") {
      history.push({
        pathname: "/movies",
        search: `?movie=${movieInput}`,
      });
    }
  };

  return (
    <nav id="navbar">
      <Link className="navbar__logo" to="/">
        Moviestagram
      </Link>
      <input onChange={(e) => setMovieInput(e.target.value)} onKeyPress={searchMovie} className="navbar__search" type="text" placeholder="영화검색" />
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
