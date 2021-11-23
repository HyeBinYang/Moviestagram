import React, { useCallback } from "react";
import "./Shadow.css";
import { useHistory } from "react-router-dom";

export default function Shadow() {
  const history = useHistory();

  const goBack = useCallback((e: any) => {
    history.goBack();
    e.stopPropagation();
  }, []);

  return (
    <div id="shadow" onClick={goBack}>
      <i className="fas fa-times" onClick={goBack}></i>
    </div>
  );
}
