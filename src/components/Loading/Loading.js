import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="loading__container">
      <div className="loading__spinner"></div>
      <p className="loading__text">Searching for news...</p>
    </div>
  );
}

export default Loading;