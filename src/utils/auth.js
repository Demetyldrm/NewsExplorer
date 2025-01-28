import { baseURL } from "./api.js";
import { checkServerResponse } from "./helper.js";

// const fetchWithTimeout = (url, options, timeout = 5000) => {
//   return Promise.race([
//     fetch(url, options),
//     new Promise((_, reject) =>
//       setTimeout(() => reject(new Error("Request timed out")), timeout)
//     ),
//   ]);
// };

// const handleErrors = (promise) =>
//   promise.catch((error) => {
//     console.error("API Error:", error.message);
//     throw error;
//   });

// const signUp = ({ email, password, name }) =>
//   handleErrors(
//     fetchWithTimeout(`${baseURL}/signup`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password, name }),
//     }).then(checkServerResponse)
//   );

// const signIn = ({ email, password }) =>
//   handleErrors(
//     fetchWithTimeout(`${baseURL}/signin`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     }).then(checkServerResponse)
//   );

// const authorizeToken = (token) => {
//   const storedToken = token || localStorage.getItem("jsonwebtoken");
//   return handleErrors(
//     fetchWithTimeout(`${baseURL}/users/me`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${storedToken}`,
//       },
//     }).then(checkServerResponse)
//   );
// };

export const signUp = (email, password, username) => {
  return new Promise((resolve, reject) => {
    if (!email || !password || !username) {
      reject({ message: "All fields are required" }); // Error handling
    } else {
      resolve({
        data: {
          _id: "fake-user-id",
          name: username,
          email: email,
        },
        message: "Registration successful!",
      });
    }
  });
};

export const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    resolve({ message: "registration successfull" });
  });
};

export const authorize = (email, password) => {
  // Pretend we did a fetch request that gave us back a token
  return new Promise((resolve, reject) => {
    resolve({ token: "a fake token" });
  });
};

export const checkToken = (token) => {
  // Pretend we did a fetch request that gave us back a user
  return new Promise((resolve, reject) => {
    resolve({
      data: { name: "fake user", email: "fake@example,com", _id: "fake-id" },
    });
  });
};
