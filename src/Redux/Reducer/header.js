import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    language: 'zh-CN',
    isClick: false
  },
  reducers: {
    showZh: state => {
      state.language = 'zh-CN';
    },
    showEn: state => {
      state.language =  'en-US';
    },
    showProfile: state => {
      state.isClick =  true;
    },
    hideProfile: state => {
      state.isClick =  false;
    },
  },
});

export const { showZh, showEn,showProfile,hideProfile } = headerSlice.actions;

export const language = state => state.header.language;

export const isClick = state => state.header.isClick;

export default headerSlice.reducer;
