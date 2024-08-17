import { configureStore } from '@reduxjs/toolkit';
import auth from './features/authSlice.js';

const store = configureStore({
    reducer: {
        auth,
    },
});

export default store;
