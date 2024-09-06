import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFaculties } from '../api/faculties';
// Async thunk to fetch faculties
export const fetchFaculties = createAsyncThunk(
    'faculties/fetchFaculties',
    async ({ pageNumber = 1, keywords = '', token }) => {
        const response = await getFaculties(pageNumber, keywords, token);
        return response.data.data;
    }
);

// Slice
const facultySlice = createSlice({
    name: 'faculties',
    initialState: {
        faculties: [],
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
            .addCase(fetchFaculties.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFaculties.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.faculties = action.payload.data;
                state.pagination = {
                    currentPage: action.payload.current_page,
                    perPage: action.payload.per_page,
                    total: action.payload.total,
                };
            })
            .addCase(fetchFaculties.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default facultySlice.reducer;
