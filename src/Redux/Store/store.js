import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../../Features/Counter/state/reducer';
import loadingReducer from '../Reducer/loading';

export default configureStore({
  reducer: {
    counter: counterReducer,
    loading:loadingReducer
  },
});