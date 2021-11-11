import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Home.css";

// Component
import LeftSide from "../components/home/leftside/LeftSide";
import RightSide from "../components/home/rightside/RightSide";
import Spinner from "../components/common/Spinner";

export default function Home() {
  const [spinner, setSpinner] = useState(true);
  const [recommandedMovies, setRecommandedMovies] = useState([]);
  const [newReviews, setNewReviews] = useState([]);

  useEffect(() => {
    const getRecommendedMovies = async () => {
      const movies = await axios.get("/movie/popular");
      setRecommandedMovies(movies.data.results.slice(0, 5));
    };

    const getNewReviews = async () => {
      const reviews = await axios.get("/review/new");
      setNewReviews(reviews.data);
    };

    getRecommendedMovies();
    getNewReviews();
    setSpinner(false);
  }, []);

  return (
    <>
      {!spinner ? (
        <div id="home">
          <LeftSide newReviews={newReviews} />
          <RightSide recommandedMovies={recommandedMovies} />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
