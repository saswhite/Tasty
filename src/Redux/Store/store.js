import { configureStore } from '@reduxjs/toolkit';
/* 局部 */
import counterReducer from '../../Features/Counter/state/reducer';
import restReducer from '../../Features/Restaurant/state/reducer';
import loginReducer from '../../Features/Login/state/reducer';
import orderReducer from '../../Features/Order/state/reducer';
import countReducer from '../../Components/MenuBox/state/reducer';
import menuReducer from '../../Features/Menu/state/reducer';
/* 全局 */
import  modalReducer from '../Reducer/Modal';
import loadingReducer from '../Reducer/loading';
import headerReducer from '../Reducer/header';
import errorReducer from '../Reducer/error';

export default configureStore({
  reducer: {
    counter: counterReducer,
    modal:modalReducer,
    loading:loadingReducer,
    header: headerReducer,
    error:errorReducer,
    rest:restReducer,
    login:loginReducer,
    order:orderReducer,
    count:countReducer,
    menu:menuReducer
  },
});