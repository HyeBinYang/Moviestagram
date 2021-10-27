import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Home from "../../pages/home/Home";
import LoginForm from "../../pages/auth/LoginForm";
import SignupForm from "../../pages/auth/SignupForm";
import MovieList from "../../pages/search/MovieList";
import Profile from "../../pages/profile/Profile";
import MovieDetail from "../../pages/movie-detail/MovieDetail";
import WritingModal from "../../pages/writing/WritingModal";
import Review from "../../pages/review/Review";

export default function Main() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div id="main">
      <Switch location={background || location}>
        <Route exact path="/" component={Home} />
        <Route path="/write" component={WritingModal} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/search" component={MovieList} />
        <Route path="/user/:user_id" component={Profile} />
        <Route path="/movie/:movie_id/reviews" component={MovieDetail}></Route>
        <Route path="/review/:review_id" component={Review} />
      </Switch>
      {background && <Route path="/review/:review_id" component={Review} />}
      {background && <Route path="/write" component={WritingModal} />}
    </div>
  );
}
