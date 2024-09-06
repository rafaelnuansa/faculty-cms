import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
// Async thunk to fetch users
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({ pageNumber = 1, keywords = '', token }) => {
        const response = await getUsers(pageNumber, keywords, token);
        return response.data.data;
    }
);

// Slice
const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        pagination: {
            currentPage: 1,
            perPage: 0,
            total: 0,
        },
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload.data;
                state.pagination = {
                    currentPage: action.payload.current_page,
                    perPage: action.payload.per_page,
                    total: action.payload.total,
                };
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;
