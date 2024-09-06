import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users'; // Ensure this path is correct

export const store = configureStore({
    reducer: {
        users: userReducer,
    },
});
