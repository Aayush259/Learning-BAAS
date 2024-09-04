
const addPosts = (state, action) => {
    state.posts = state.posts.concat([...action.payload]);
};

const deletePost = (state, action) => {
    state.posts = state.posts.filter(post => post.$id !== action.payload);
};

const removeAllPostsFromStore = state => {
    state.posts = [];
};

export { addPosts, deletePost, removeAllPostsFromStore };
