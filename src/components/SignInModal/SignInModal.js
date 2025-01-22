import React, { useState, useEffect, useMemo } from "react";
import { useFormWithValidation } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SignInModal({
  isOpen,
  onSignUpModal,
  onSubmit,
  handleCloseModal,
  isModalLoading,
}) {
  const defaultValues = useMemo(() => ({ email: "", password: "" }), []);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation(defaultValues);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
    console.log("The user is signed in");
  };

  return (
    <ModalWithForm
      title="Sign in"
      modalName="SignIn"
      isOpen={isOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
    >
      <p className="modal__signIn-title">Sign In</p>
      <label className="modal__label" htmlFor="email">
        Email{" "}
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="modal__input"
        placeholder="Enter email"
        value={values.email || ""}
        onChange={handleChange}
        required
        autoComplete="email"
      />
      <span className="modal__error">{errors.email}</span>

      <label className="modal__label" htmlFor="password">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="modal__input"
        placeholder="Enter password"
        value={values.password || ""}
        onChange={handleChange}
        required
        autoComplete="current-password"
      />
      <span className="modal__error">{errors.password}</span>

      <button
        type="submit"
        className={`modal__submit-button modal_button-signIn ${
          !isValid || isModalLoading ? "modal__submit-button_disabled" : ""
        }`}
        disabled={!isValid || isModalLoading}
      >
        {isModalLoading ? "Loading..." : "Sign In"}
      </button>

      <button
        className="modal__redirect-button"
        onClick={onSignUpModal}
        type="button"
      >
        <span className="modal__redirect-button-text">or</span> Sign Up
      </button>
    </ModalWithForm>
  );
}

export default SignInModal;
