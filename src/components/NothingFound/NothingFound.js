import React from "react";
import "./NothingFound.css";
import nothingFound from "../../images/nothing-found.svg";

function NothingFound() {
  return (
    <div className="notfound__container">
      <img className="notfound__image" src={nothingFound} alt="nothing found" />
      <h4 className="notfound__title">Nothing found</h4>
      <p className="notfound__text">
        Sorry, but nothing matched your search terms.
      </p>
    </div>
  );
}

export default NothingFound;
