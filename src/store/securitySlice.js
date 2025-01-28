// This portion of the project is created for the second stage.

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { axiosInstance } from "../utils/api";
// import { authorize } from "../utils/auth";

// const initialState = {
//   isAuthenticated: false,
//   isRegistered: false,
//   accessToken: "",
//   userId: 0,
//   err: "",
// };

// export const login = createAsyncThunk(
//   "auth/login",
//   async (loginCred, thunkApi) => {
//     try {
//       console.log(loginCred);
//       // const response = await axiosInstance.post(`/auth/login`, loginCred);
//       const response = await authorize(/*todo add real arguments*/);
//       localStorage.setItem("jsonwebtoken", response.data.accessToken);
//       localStorage.setItem("userId", JSON.stringify(response.data.userId));

//       return response.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const register = createAsyncThunk(
//   "auth/register",
//   async (registerCred, thunkApi) => {
//     try {
//       const response = await axiosInstance.post(`/auth/register`, registerCred);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return thunkApi.rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const securitySlice = createSlice({
//   name: "security",
//   initialState,
//   reducers: {
//     signOut: (state) => {
//       localStorage.removeItem("jsonwebtoken");
//       localStorage.removeItem("userId");
//       state.isAuthenticated = false;
//       state.accessToken = "";
//       state.userId = 0;
//       state.err = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(login.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(login.fulfilled, (state, action) => {
//       state.isAuthenticated = true;
//       state.userId = action.payload.userId;
//       state.accessToken = action.payload.accessToken;
//       state.err = "";
//     });
//     builder.addCase(login.rejected, (state, action) => {
//       state.isAuthenticated = false;
//       state.username = "";
//       state.accessToken = "";
//       state.err = "Invalid Credentials";
//     });
//     builder.addCase(register.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(register.fulfilled, (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.isRegistered = true;
//       state.err = "";
//     });
//     builder.addCase(register.rejected, (state, action) => {
//       state.loading = false;
//       state.err = "Username or Email existed.";
//     });
//   },
// });

// export const { signOut } = securitySlice.actions;
// export default securitySlice.reducer;
