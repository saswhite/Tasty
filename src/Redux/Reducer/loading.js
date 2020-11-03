import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading:false
  },
  reducers: {
    /* 显示loading */
    showLoading:state => {
      state.isLoading = true;
    },
    /* 隐藏loading */
    hideLoading: state => {
      state.isLoading = false;
    },
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectIsLoading = state => state.loading.isLoading;

export default loadingSlice.reducer;
