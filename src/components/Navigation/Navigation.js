import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoggedIn, currentUser, onSignInModal, onLogout }) {
  const reactLocation = useLocation();
  const currentLocation = reactLocation.pathname;

  useEffect(() => {
    console.log("Current User in Navigation:", currentUser);
  }, [currentLocation, currentUser]);

  return (
    <nav className="nav">
      <div className="nav__left-container">
        <Link to="/" className="nav__logo-link">
          <h2
            className={`nav__logo ${
              currentLocation === "/saved-news" ? "nav__logo-saved-news" : ""
            }`}
          >
            NewsExplorer
          </h2>
        </Link>
      </div>

      <div className="nav__right-container">
        <ul className="nav__container-links">
          <li>
            <Link to="/">
              <button
                className={
                  currentLocation === "/"
                    ? "nav__btn nav__btn-active"
                    : "nav__btn-saved-news"
                }
              >
                Home
              </button>
            </Link>
          </li>

          {isLoggedIn && (
            <li>
              <Link to="/saved-news">
                <button
                  className={
                    currentLocation === "/saved-news"
                      ? "nav__btn-saved-news nav__btn-active-saved-news"
                      : "nav__btn"
                  }
                >
                  Saved Articles
                </button>
              </Link>
            </li>
          )}

          {isLoggedIn ? (
            <li>
              <button
                className={`nav__btn-logout ${
                  currentLocation === "/saved-news"
                    ? "nav__btn-logout-saved-news"
                    : ""
                }`}
                onClick={onLogout}
              >
                {currentUser?.name || "User"}
              </button>
            </li>
          ) : (
            <li>
              <button
                className="modal__open nav__btn-signIn"
                onClick={onSignInModal}
              >
                Sign in
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
