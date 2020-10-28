import { createSlice } from '@reduxjs/toolkit';
import { showLoading,hideLoading } from './loading';
import { showErrorAsync } from './error';
import { regist } from '../../Request/regist';
import intl from 'react-intl-universal';

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

export  function postRegist (registInfo){
  return async (dispatch)=>{
    try {
      dispatch(showLoading());
      await regist(registInfo);
      dispatch(showErrorAsync(intl.get('login.signUpSuccess')));
    } catch (error) {
      dispatch(showErrorAsync(error.message));
    }finally{
      dispatch(hideLoading());
    }
  };
}

export const { showModal, hideModal } = modalSlice.actions;

export const isShow = state => state.modal.isShow;

export default modalSlice.reducer;
