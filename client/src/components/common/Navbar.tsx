import React, { useCallback, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import { clearUser } from "../../modules/auth";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const history = useHistory();
  const userName = useSelector((state: RootStateOrAny) => state.auth.userName);
  const dispatch = useDispatch();
  const [movieInput, setMovieInput] = useState<string>("");

  const searchMovie = useCallback(
    (e: any) => {
      if (e.key === "Enter") {
        history.push({
          pathname: "/movies",
          search: `?movie=${movieInput}`,
        });
      }
    },
    [movieInput],
  );

  const logout = useCallback(() => {
    axios
      .post("/auth/logout")
      .then(() => dispatch(clearUser()))
      .catch((err) => console.log(err));
  }, []);

  return (
    <nav id="navbar">
      <Link className="navbar__logo" to="/">
        Moviestagram
      </Link>
      <input
        onChange={(e) => setMovieInput(e.target.value)}
        onKeyPress={searchMovie}
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
          <i className="far fa-heart"></i>
        </li>
        {userName ? (
          <li className="menu" onClick={logout}>
            <i className="fas fa-sign-out-alt"></i>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
