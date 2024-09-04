import { createSlice } from '@reduxjs/toolkit';
import {
    addPosts as add,
    deletePost as del,
    removeAllPostsFromStore as clearAll,
} from '../reducers/postReducers';

const initialState = {
    posts: [],
};

const homePostsSlice = createSlice({
    name: 'homePosts',
    initialState,
    reducers: {
        addPosts: add,
        deletePost: del,
        clearAllPostsFromStore: clearAll,
    }
});

export const { addPosts, deletePost, clearAllPostsFromStore } = homePostsSlice.actions;

export default homePostsSlice.reducer;
