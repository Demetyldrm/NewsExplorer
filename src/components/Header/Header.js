import Navigation from "../Navigation/Navigation";
// import { Link } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

function Header({
  isLoggedIn,
  currentUser,
  onSignInModal,
  onLogout,
  onSubmit,
}) {
  return (
    <header className="header" id="header">
      <Navigation
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={onLogout}
        onSignInModal={onSignInModal}
      />

      <div className="header__container">
        <h1 className="header__title">What's going on in the world?</h1>
        <p className="header__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchBar onSubmit={onSubmit} />
      </div>
    </header>
  );
}

export default Header;
