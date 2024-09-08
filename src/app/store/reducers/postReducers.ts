import { PayloadAction } from '@reduxjs/toolkit';

// Structure of post.
interface Post {
    $id: string;
    [key: string]: any;
}

// Structure of state.
interface State {
    posts: Post[];
}

const addPosts = (state: State, action: PayloadAction<Post[]>) => {
    state.posts = state.posts.concat([...action.payload]);
};

const deletePost = (state: State, action: PayloadAction<string>) => {
    state.posts = state.posts.filter(post => post.$id !== action.payload);
};

const removeAllPostsFromStore = (state: State) => {
    state.posts = [];
};

export { addPosts, deletePost, removeAllPostsFromStore };
