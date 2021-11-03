import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./styles/Home.css";

// Component
import LeftSide from "../components/home/leftside/LeftSide";
import RightSide from "../components/home/rightside/RightSide";
import Spinner from "../components/common/Spinner";

export default function Home() {
  const location = useLocation();
  const [spinner, setSpinner] = useState(true);
  const [recommandedMovies, setRecommandedMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/movie/popular")
      .then((res) => {
        setRecommandedMovies(res.data.results.slice(0, 5));
        setSpinner(false);
      })
      .catch((err) => console.log(err));
  }, [location]);

  return (
    <>
      {!spinner ? (
        <div id="home">
          <LeftSide />
          <RightSide recommandedMovies={recommandedMovies} />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
