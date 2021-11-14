import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import "./Main.css";

import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Movies from "../../pages/Movies";
import User from "../../pages/User";
import MovieDetail from "../../pages/MovieDetail";
import Writing from "../../pages/Writing";
import Review from "../../pages/Review";
import { useSelector } from "react-redux";

export default function Main() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const userId = useSelector((state) => state.auth.userId);

  return (
    <div id="main">
      <Switch location={background || location}>
        {!userId ? <Route exact path="/" component={Login} /> : <Route exact path="/" component={Home} />}
        <Route path="/write" component={Writing} />
        <Route path="/signup" component={Signup} />
        <Route path="/movies" component={Movies} />
        <Route path="/user/:user_id" component={User} />
        <Route path="/movie/:movie_id/reviews" component={MovieDetail}></Route>
        <Route path="/review/:review_id" component={Review} />
      </Switch>
      {background && <Route path="/review/:review_id" component={Review} />}
      {background && <Route path="/write" component={Writing} />}
    </div>
  );
}
