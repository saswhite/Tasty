import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    language: localStorage.getItem('language') || '',
    isClick: false
  },
  reducers: {
    showZh: state => {
      state.language = 'zh-CN';
      localStorage.setItem('language','zh-CN');
    },
    showEn: state => {
      state.language =  'en-US';
      localStorage.setItem('language','en-US');
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
