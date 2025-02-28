import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  news: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    fetchNewsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchNewsSuccess(state, action) {
      state.news = action.payload;
      state.loading = false;
    },
    fetchNewsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addNews(state, action) {
      state.news.unshift(action.payload);
    },
  },
});

export const { fetchNewsStart, fetchNewsSuccess, fetchNewsFailure, addNews } = newsSlice.actions;

export const fetchTrendingNews = () => async (dispatch) => {
  try {
    dispatch(fetchNewsStart());
    const response = await axios.get('http://localhost:5000/api/news/trending');
    dispatch(fetchNewsSuccess(response.data));
  } catch (err) {
    dispatch(fetchNewsFailure(err.message));
  }
};

export default newsSlice.reducer;