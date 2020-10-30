import { createSlice } from '@reduxjs/toolkit';

export const countSlice = createSlice({
  name: 'count',
  initialState: {
    value: 1,
  },
  reducers: {
    add: (state) => {
      state.value += 1;
    },
    remove: state => {
      state.value -= 1;
    }
  },
});

export const { add, remove } = countSlice.actions;

export const ControlCount = state => state.count.value;

export default countSlice.reducer;
