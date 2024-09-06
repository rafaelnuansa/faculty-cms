import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users'; // Ensure this path is correct
import facultyReducer from './faculties';

export const store = configureStore({
    reducer: {
        users: userReducer,
        faculties: facultyReducer,
    },
});
