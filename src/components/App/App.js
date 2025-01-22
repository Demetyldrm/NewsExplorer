import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import SavedNews from "../SavedNewsPage/SavedNews.js";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SignInModal from "../SignInModal/SignInModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useDispatch } from "react-redux";
import { login, register } from "../../store/securitySlice.js";
import {
  getNewsByDateAndKeyword,
  getSavedArticles,
} from "../../store/newsSlice.js";
function App() {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [serverErrors, setServerErrors] = useState("");
  const [isModalLoading, setIsModalLoading] = useState(false);

  const handleSignUpModal = () => setActiveModal("signUp");

  const handleOpenModal = (modalType) => {
    setActiveModal(modalType); // Set the active modal type
  };

  const handleCloseModal = () => {
    setActiveModal(null); // Close all modals
  };

  const handleSignInModal = () => {
    console.log("handleSignInModal triggered");
    setActiveModal("signIn");
  };

  //Creating these function now for the second stage of the project
  const handleSignUp = (values) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        handleCloseModal();
        setActiveModal("signUp");
      })
      .catch(() => setServerErrors("This email is already in use"));
  };

  //Creating these function now for the second stage of the project
  const handleSignIn = (values) => {
    dispatch(login(values))
      .unwrap()
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        handleCloseModal();
      })
      .catch(() => setServerErrors("Invalid email or password"));
  };

  const handleNewsArticleSearch = (keyword) => {
    setIsPageLoading(true);
    dispatch(getNewsByDateAndKeyword({ keyword }))
      .unwrap()
      .then(() => setIsSearching(true))
      .catch(() => setServerErrors("Error fetching news"))
      .finally(() => setIsPageLoading(false));
  };

  //Creating these function now for the second stage of the project
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getSavedArticles())
        .unwrap()
        .catch(() => setServerErrors("Error fetching saved articles"));
    }
  }, [isLoggedIn, dispatch]);

  useEffect(() => {
    function handleCloseMethods(evt) {
      // Close the modal when "Escape" key is pressed
      if (evt.key === "Escape") {
        handleCloseModal();
      }

      // Close the modal when clicking on the outside content
      if (evt.type === "click" && evt.target.classList.contains("modal")) {
        handleCloseModal();
      }

      // Close the modal when clicking the close button
      if (
        evt.type === "click" &&
        evt.target.classList.contains("modal__close-button")
      ) {
        handleCloseModal();
      }
    }

    if (activeModal !== "") {
      document.addEventListener("keydown", handleCloseMethods);
    }

    return () => {
      document.removeEventListener("keydown", handleCloseMethods);
    };
  }, [activeModal]);

  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains("modal")) {
      handleCloseModal();
    }
  };

  return (
    <div className="page">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onSignInModal={handleSignInModal}
        onSingUpModal={handleSignUpModal}
        onSubmit={handleNewsArticleSearch}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              isLoggedIn={isLoggedIn}
              isSearching={isSearching}
              isPageLoading={isPageLoading}
              handleSignInModal={handleSignInModal}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SavedNews isLoggedIn={isLoggedIn} currentUser={currentUser} />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />

      {activeModal === "signIn" && (
        <div
          className={`modal modal__type-signIn ${
            activeModal === "signIn" ? "modal__open" : ""
          }`}
          onClick={handleOverlayClick}
        >
          <SignInModal
            modalName="signIn"
            isOpen={activeModal === "signIn"}
            onSignInModal={handleSignInModal}
            handleCloseModal={handleCloseModal}
            onSignUpModal={handleSignUpModal}
            onSubmit={handleSignIn}
          />
        </div>
      )}

      {activeModal === "signUp" && (
        <div
          className={`modal modal__type-signUp ${
            activeModal === "signUp" ? "modal__open" : ""
          }`}
          onClick={handleOverlayClick}
        >
          <SignUpModal
            modalName="signUp"
            isOpen={activeModal === "signUp"}
            handleCloseModal={handleCloseModal}
            onSignUpModal={handleSignUpModal}
            onSignInModal={handleSignInModal}
            onSubmit={handleSignUp}
            isModalLoading={isModalLoading}
            serverErrors={serverErrors}
          />
        </div>
      )}
    </div>
  );
}

export default App;
