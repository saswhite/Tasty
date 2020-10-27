import { configureStore } from '@reduxjs/toolkit';
/* 局部 */
import counterReducer from '../../Features/Counter/state/reducer';
/* 全局 */
import  modalReducer from '../Reducer/Modal';

export default configureStore({
  reducer: {
    counter: counterReducer,
    modal:modalReducer
  },
});