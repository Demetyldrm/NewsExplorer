import React from "react";

import "./ModalWithForm.css";

function ModalWithForm({ children, modalName, onClose, onSubmit, isOpen }) {
  return (
    <div
      className={`modal modal__type-${modalName} ${
        isOpen ? "modal__open" : ""
      }`}
      role="dialog"
      aria-hidden={!isOpen}
      aria-labelledby={`${modalName}-title`}
    >
      <div
        className={`modal__content ${
          modalName === "signUp" ? "modal__content-singUp" : ""
        }`}
      >
        <button
          className="modal__close-button "
          type="button"
          onClick={onClose}
          aria-label="Close"
        />
        <form
          className={`modal__form ${
            modalName === "signUp" ? "modal__form-signUp" : "modal__form-signIn"
          }`}
          onSubmit={onSubmit}
        >
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
