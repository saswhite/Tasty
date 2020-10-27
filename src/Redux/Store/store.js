import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../../Features/Counter/state/reducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});