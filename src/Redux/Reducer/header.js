import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    isTransform: false,
    isClick: false
  },
  reducers: {
    showCh: state => {
      state.isTransform = false;
    },
    showEn: state => {
      state.isTransform =  true;
    },
    showProfile: state => {
      state.isClick =  true;
    },
    hideProfile: state => {
      state.isClick =  false;
    },
  },
});

export const { showCh, showEn,showProfile,hideProfile } = headerSlice.actions;

export const isTransform = state => state.header.isTransform;

export const isClick = state => state.header.isClick;

export default headerSlice.reducer;
