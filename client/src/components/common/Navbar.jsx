import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import { clearUser } from "../../modules/auth";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const history = useHistory();
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const [movieInput, setMovieInput] = useState("");

  const searchMovie = (e) => {
    if (e.key === "Enter") {
      history.push({
        pathname: "/movies",
        search: `?movie=${movieInput}`,
      });
    }
  };

  const logout = () => {
    axios
      .post("/auth/logout")
      .then(() => dispatch(clearUser()))
      .catch((err) => console.log(err));
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
          <i className="far fa-heart"></i>
        </li>
        {userId ? (
          <li className="menu" onClick={logout}>
            <i className="fas fa-sign-out-alt"></i>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
