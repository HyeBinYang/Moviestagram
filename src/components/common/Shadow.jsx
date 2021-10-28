import React from "react";
import "./Shadow.css";
import { useHistory } from "react-router-dom";

export default function Shadow() {
  const history = useHistory();

  return (
    <div
      id="shadow"
      onClick={() => {
        history.goBack();
      }}
    >
      <i className="fas fa-times" onClick={() => history.goBack()}></i>
    </div>
  );
}
