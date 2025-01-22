import { baseURL } from "./api.js";
import { checkServerResponse } from "./helper.js";

const fetchWithTimeout = (url, options, timeout = 5000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
};

const handleErrors = (promise) =>
  promise.catch((error) => {
    console.error("API Error:", error.message);
    throw error;
  });

const signUp = ({ email, password, name }) =>
  handleErrors(
    fetchWithTimeout(`${baseURL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    }).then(checkServerResponse)
  );

const signIn = ({ email, password }) =>
  handleErrors(
    fetchWithTimeout(`${baseURL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(checkServerResponse)
  );

const authorizeToken = (token) => {
  const storedToken = token || localStorage.getItem("jsonwebtoken");
  return handleErrors(
    fetchWithTimeout(`${baseURL}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
    }).then(checkServerResponse)
  );
};

export { signIn, signUp, authorizeToken };
