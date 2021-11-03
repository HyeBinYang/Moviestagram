import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Movies from "../../pages/Movies";
import User from "../../pages/User";
import MovieDetail from "../../pages/MovieDetail";
import Writing from "../../pages/Writing";
import Review from "../../pages/Review";

export default function Main() {
  const location = useLocation();
  const background = location.state && location.state.background;
  // const isAuthorized = sessionStorage.getItem("isAuthorized");
  const isAuthorized = true;

  return (
    <div id="main">
      <Switch location={background || location}>
        {!isAuthorized ? <Route path="/" component={Login} /> : <Route exact path="/" component={Home} />}
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
