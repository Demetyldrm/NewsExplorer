import React, { useState } from "react";
import { formatSearchResDate } from "../../utils/helper";
import { useLocation } from "react-router-dom";
import {
  unsaveArticle,
  saveArticle,
  removeSavedArticle,
} from "../../store/newsSlice";
import "./NewsCard.css";

function NewsCard({ isLoggedIn, newsItem, isSaved, handleSignInModal }) {
  const formattedDate = formatSearchResDate(
    newsItem.publishedAt || newsItem.date
  );
  const [showIcon, setShowIcon] = useState(false);
  const location = useLocation().pathname;
  const handleShowIcon = () => setShowIcon(true);
  const handleHideIcon = () => setShowIcon(false);
  const handleSaveClick = () => {
    if (isLoggedIn) {
      isSaved
        ? unsaveArticle(newsItem)
        : saveArticle(newsItem, newsItem.keyword);
    } else {
      handleSignInModal();
    }
  };
  const handleDeleteClick = () => removeSavedArticle(newsItem);

  return (
    <article className="newscard__container">
      {isLoggedIn && location === "/saved-news" ? (
        <div className="newscard__keyword">{newsItem.keyword}</div>
      ) : (
        ""
      )}
      <div className="newscard__bookmark">
        {!isLoggedIn && !isSaved && showIcon ? (
          <p className="newscard__bookmark-message">Sign in to save articles</p>
        ) : (isSaved && isLoggedIn && showIcon) ||
          (location === "/saved-news" && showIcon) ? (
          <p className="newscard__bookmark-message">Remove from saved</p>
        ) : (
          ""
        )}
        {isLoggedIn && location === "/saved-news" ? (
          <button
            className="newscard__delete-button"
            onMouseOver={handleShowIcon}
            onMouseOut={handleHideIcon}
            onClick={handleDeleteClick}
          ></button>
        ) : (
          <button
            className={
              isSaved
                ? "newscard__bookmark-button-active"
                : "newscard__bookmark-button"
            }
            onMouseOver={handleShowIcon}
            onMouseOut={handleHideIcon}
            onClick={handleSaveClick}
          ></button>
        )}
      </div>
      <img
        className="newscard__image"
        src={newsItem.urlToImage || newsItem.image}
        alt={newsItem.description}
      />
      <div className="newscard__info-container">
        <p className="newscard__date">{formattedDate}</p>
        <h3 className="newscard__title">{newsItem.title}</h3>
        <p className="newscard__text">
          {newsItem.description || newsItem.text}
        </p>
        <p className="newscard__publisher">
          {newsItem.source.name || newsItem.name}
        </p>
      </div>
    </article>
  );
}

export default NewsCard;
