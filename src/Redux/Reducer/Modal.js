import { createSlice } from '@reduxjs/toolkit';
import { showLoading,hideLoading } from './loading';
import { showErrorAsync } from './error';
import intl from 'react-intl-universal';
/** request */
import { regist } from '../../Request/regist';

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
      dispatch(hideModal());
      dispatch(showErrorAsync(intl.get('login.signUpSuccess')));
      return true;
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
