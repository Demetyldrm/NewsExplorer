import { configureStore } from "@reduxjs/toolkit";
import securitySlice from "./securitySlice";
import newsSlice from "./newsSlice";

export const store = configureStore({
  reducer: {
    security: securitySlice,
    articles: newsSlice,
  },
});
