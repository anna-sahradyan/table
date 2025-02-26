import { createSlice } from '@reduxjs/toolkit';
import { fetchTests, fetchSites } from './thunk.ts';
import { ISite, ITest } from './type.ts';

interface DataState {
    sites: ISite[];
    tests: ITest[];
    loading: boolean;
    error: string | null;
}

const initialState: DataState = {
    sites: [],
    tests: [],
    loading: false,
    error: null,
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTests.fulfilled, (state, action) => {
                state.loading = false;
                state.tests = action.payload;
            })
            .addCase(fetchTests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка при получении тестов';
            })
            .addCase(fetchSites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSites.fulfilled, (state, action) => {
                state.loading = false;
                state.sites = action.payload;
            })
            .addCase(fetchSites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка при получении сайтов';
            });
    },
});

export default dataSlice.reducer;
