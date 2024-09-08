import { PayloadAction } from '@reduxjs/toolkit';
import { CreateUpdateGetPostResponseType } from '../../interfaces/interfaces';

// Structure of state.
interface State {
    posts: CreateUpdateGetPostResponseType[];
}

const addPosts = (state: State, action: PayloadAction<CreateUpdateGetPostResponseType[]>) => {
    state.posts = state.posts.concat([...action.payload]);
};

const deletePost = (state: State, action: PayloadAction<string>) => {
    state.posts = state.posts.filter(post => post.$id !== action.payload);
};

const removeAllPostsFromStore = (state: State) => {
    state.posts = [];
};

export { addPosts, deletePost, removeAllPostsFromStore };
