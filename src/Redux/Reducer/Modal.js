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
/* 注册 */
export  function postRegist (registInfo){
  return async (dispatch)=>{
    try {
      /* 显示loading */
      dispatch(showLoading());
      /* 发送注册请求 */
      await regist(registInfo);
      /* 隐藏注册界面 */
      dispatch(hideModal());
      /* 显示注册结果 */
      dispatch(showErrorAsync(intl.get('login.signUpSuccess')));
      return true;
    } catch (error) {
      /* 请求失败显示error */
      dispatch(showErrorAsync(error.message));
    }finally{
      dispatch(hideLoading());
    }
  };
}

export const { showModal, hideModal } = modalSlice.actions;

export const isShow = state => state.modal.isShow;

export default modalSlice.reducer;
