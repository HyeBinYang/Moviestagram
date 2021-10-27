import React from "react";
import "./Home.css";

// Component
import LeftSide from "../../components/home/leftside/LeftSide";
import RightSide from "../../components/home/rightside/RightSide";

export default function Home() {
  return (
    <div id="home">
      <LeftSide />
      <RightSide />
    </div>
  );
}
