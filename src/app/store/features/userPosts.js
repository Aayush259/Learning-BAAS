import { createSlice } from '@reduxjs/toolkit';
import {
    addPosts as add,
    deletePost as del,
    removeAllPostsFromStore as clearAll,
} from '../reducers/postReducers';

const initialState = {
    posts: [],
};

const userPostSlice = createSlice({
    name: 'userPosts',
    initialState,
    reducers: {
        addPosts: add,
        deleteUserPost: del,
        clearAllPostsFromStore: clearAll,
    }
});

export const { addPosts, deleteUserPost, clearAllPostsFromStore } = userPostSlice.actions;

export default userPostSlice.reducer;
