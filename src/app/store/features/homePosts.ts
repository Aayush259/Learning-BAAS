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
    name: "homePosts",
    initialState,
    reducers: {
        addPosts: add,
        deleteUserPost: del,
        clearAllPostsFromStore: clearAll,
    }
});

export const {addPosts, clearAllPostsFromStore, deleteUserPost} = homePostsSlice.actions;

export default homePostsSlice.reducer;
