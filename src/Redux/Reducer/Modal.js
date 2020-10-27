import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isShow: false,
  },
  reducers: {
    showModal: state => {
      state.isShow = true;
    },
    hideModal: state => {
      state.isShow = false;
    }
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export const isShow = state => state.modal.isShow;

export default modalSlice.reducer;
