import React from "react";
import "./Home.css";

// Component
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

function Home() {
  return (
    <div id="home">
      <LeftSide />
      <RightSide />
    </div>
  );
}

export default Home;
