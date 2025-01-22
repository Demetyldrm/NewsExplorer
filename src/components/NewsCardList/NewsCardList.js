import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";
import NothingFound from "../NothingFound/NothingFound";
import { useSelector } from "react-redux";

function NewsCardList({
  isLoggedIn,
  isPageLoading,
  isSearching,
  handleSignInModal,
}) {
  let [cardView, setCardView] = useState(3);
  const handleSearchRes = () => setCardView(cardView + 3);
  const news = useSelector((state) => state.articles.news);
  const savedNews = useSelector((state) => state.articles.savedNews);

  return !isPageLoading && isSearching && news.length === 0 ? (
    <NothingFound />
  ) : !isPageLoading && isSearching && news.length >= 3 ? (
    <section className="newscardlist">
      <h2 className="newscardlist__result">Search results</h2>
      <ul className="newscardlist__container">
        {news.slice(0, cardView).map((newsItem, index) => {
          const isSaved =
            savedNews.find((savedItem) => {
              return savedItem.link === newsItem.url;
            }) != null;
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
      {cardView <= news.length ? (
        <button
          className="newscardlist__button-show-more"
          type="button"
          onClick={handleSearchRes}
        >
          Show more
        </button>
      ) : (
        ""
      )}
    </section>
  ) : (
    ""
  );
}

export default NewsCardList;
