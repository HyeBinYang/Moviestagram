import React from "react";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="loader-container">
      <div className="loader">
        <i className="fas fa-spinner fa-5x"></i>
      </div>
    </div>
  );
}
