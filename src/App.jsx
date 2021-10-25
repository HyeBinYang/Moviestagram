import React from "react";
import "./App.css";

// Components
import Navbar from "./components/common/Navbar";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import Home from "./components/home/Home";
import MovieList from "./components/search/MovieList";
import MovieDetail from "./components/review/MovieDetail";

function App() {
  return (
    <div>
      <Navbar />
      <MovieDetail />
    </div>
  );
}

export default App;
