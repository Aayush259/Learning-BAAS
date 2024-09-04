import { configureStore } from '@reduxjs/toolkit';
import auth from './features/authSlice.js';
import homePosts from './features/homePosts.js';
import userPosts from './features/userPosts.js';

const store = configureStore({
  reducer: {
    auth,
    homePosts,
    userPosts,
  },
});

export default store;
