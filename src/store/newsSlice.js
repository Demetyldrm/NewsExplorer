import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newsApiInstance } from "../utils/api";
import { axiosInstance } from "../utils/api";

const initialState = {
  news: [],
  savedNews: [],
  loading: true,
  err: {},
};

export const getNewsByDateAndKeyword = createAsyncThunk(
  "/getnews",
  async ({ keyword, fromDate, toDate }, thunkApi) => {
    try {
      const response = await newsApiInstance.get("/", {
        params: {
          q: keyword, // keyword search
          from: fromDate, // start date
          to: toDate, // finish date
          pageSize: 100, // page size
        },
      });
      return response.data.articles; // returned news
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || "An error occurred"
      );
    }
  }
);

export const getSavedArticles = createAsyncThunk(
  "/getSavedArticles",
  async ({ userId }, thunkApi) => {
    try {
      const response = await axiosInstance.get("/", {
        params: {
          userId: userId,
        },
      });
      return response.data; // returned news
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || "An error occurred"
      );
    }
  }
);

//this part is going to be for the second stage of the project

export const saveArticle = createAsyncThunk(
  "news/saveArticle",
  async ({ newsItem, keyword = "Keyword N/A" }, thunkAPI) => {
    try {
      // const response = await saveArticleApi(newsItem, keyword); // API call
      // return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error occurred while saving the article"
      );
    }
  }
);
export const unsaveArticle = createAsyncThunk(
  "news/unsaveArticle",
  async (newsItem, thunkAPI) => {
    try {
      // const response = await removeArticleApi(newsItem._id);
      // return { id: newsItem._id };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error occurred while unsaving the article"
      );
    }
  }
);

export const removeSavedArticle = createAsyncThunk(
  "news/removeSavedArticle",
  async (newsItem, thunkAPI) => {
    try {
      // const response = await removeArticleApi(newsItem._id); // API call (news ID)
      // return { id: newsItem._id }; // returns the deleted news id
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error occurred while removing the article"
      );
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {}, // If a data gets updated without backend
  extraReducers: (builder) => {
    builder.addCase(getNewsByDateAndKeyword.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getNewsByDateAndKeyword.fulfilled, (state, action) => {
      state.news = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getNewsByDateAndKeyword.rejected, (state) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });
  },
});

export default newsSlice.reducer;
