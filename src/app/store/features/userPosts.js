import { createSlice } from '@reduxjs/toolkit';
import {
    addPosts as add,
    deletePost as del,
} from '../reducers/postReducers';

const initialState = {
    posts: [],
};

const userPostSlice = createSlice({
    name: 'userPosts',
    initialState,
    reducers: {
        addPosts: add,
        deletePost: del,
    }
});

export const { addPosts, deletePost } = userPostSlice.actions;

export default userPostSlice.reducer;
