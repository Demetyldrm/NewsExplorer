import React, { useState } from "react";
import { useSelector } from "react-redux";
import NewsCard from "../NewsCard/NewsCard";
import NothingFound from "../NothingFound/NothingFound";
import "./NewsCardList.css";

function NewsCardList({
  isLoggedIn,
  isPageLoading,
  isSearching,
  handleSignInModal,
}) {
  const [cardView, setCardView] = useState(3);
  const handleSearchRes = () => setCardView(cardView + 3);

  const news = useSelector((state) => state.articles.news);
  const savedNews = useSelector((state) => state.articles.savedNews);

  const hasNoResults = !isPageLoading && isSearching && news.length === 0;
  const hasSearchResults = !isPageLoading && isSearching && news.length >= 3;
  const showMoreButton = cardView <= news.length;

  if (hasNoResults) {
    return <NothingFound />;
  }

  if (hasSearchResults) {
    return (
      <section className="newscardlist">
        <h2 className="newscardlist__result">Search results</h2>
        <ul className="newscardlist__container">
          {news.slice(0, cardView).map((newsItem, index) => {
            const isSaved = savedNews.some(
              (savedItem) => savedItem.link === newsItem.url
            );

            return (
              <NewsCard
                key={index}
                newsItem={newsItem}
                isLoggedIn={isLoggedIn}
                isSaved={isSaved}
                handleSignInModal={handleSignInModal}
              />
            );
          })}
        </ul>
        {showMoreButton && (
          <button
            className="newscardlist__button-show-more"
            type="button"
            onClick={handleSearchRes}
          >
            Show more
          </button>
        )}
      </section>
    );
  }

  return null;
}

export default NewsCardList;
