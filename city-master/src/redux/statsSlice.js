import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { allUsers } from './database/firebaseDatabse';

export const fetchStatsData = createAsyncThunk('stats/fetchStatsData', async () => {
  return allUsers().then((data) => data);
});

export const statisticSlice = createSlice({
  name: 'stats',
  initialState: {
    data: null,
  },

  extraReducers: {
    [fetchStatsData.pending]: (state, { payload }) => {
      console.log('loading');
    },
    [fetchStatsData.fulfilled]: (state, { payload }) => {
      state.data = payload;
    },
  },
});
