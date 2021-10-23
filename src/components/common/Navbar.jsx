import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav id="navbar">
      <a className="navbar__logo" href="#">
        Moviestagram
      </a>
      <input className="navbar__search" type="text" placeholder="영화검색" />
      <ul className="navbar__menu">
        <li className="menu">
          <a href="#">
            <i class="fas fa-home"></i>
          </a>
        </li>
        <li className="menu">
          <a href="#">
            <i class="far fa-heart"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
