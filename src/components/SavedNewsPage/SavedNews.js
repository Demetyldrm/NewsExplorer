import React, { useEffect, useState } from "react";
import "./SavedNews.css";
import Navigation from "../Navigation/Navigation";

// this component is for the second stage of the final project
const SavedNews = ({ isLoggedIn }) => {
  const [savedNews, setSavedNews] = useState([]);
  const currentUser = { userId: "1", name: "Demet" };

  // Load saved news from localStorage
  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem("savedNews")) || [];
    setSavedNews(savedArticles);
  }, []);

  return (
    <div className="saved-news-page">
      {/* Navigation Header */}
      <div className="saved-news-page__container">
        <Navigation isLoggedIn={isLoggedIn} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default SavedNews;
