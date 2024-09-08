import { configureStore } from '@reduxjs/toolkit';
import auth from './features/authSlice';
import homePosts from './features/homePosts';
import userPosts from './features/userPosts';

const store = configureStore({
  reducer: {
    auth,
    homePosts,
    userPosts,
  },
});

export default store;
