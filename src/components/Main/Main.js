import React from "react";
import NewsCardList from "../NewsCardList/NewsCardList";
import Loading from "../Loading/Loading";
import About from "../About/About";
import "./Main.css";

function Main({ isLoggedIn, isSearching, isPageLoading, handleSignInModal }) {
  return (
    <>
      {isPageLoading === false ? (
        <NewsCardList
          isLoggedIn={isLoggedIn}
          isPageLoading={isPageLoading}
          isSearching={isSearching}
          handleSignInModal={handleSignInModal}
        />
      ) : (
        <Loading />
      )}
      <About />
    </>
  );
}

export default Main;
