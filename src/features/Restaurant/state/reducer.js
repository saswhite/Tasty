import { createSlice } from '@reduxjs/toolkit';
import { showLoading,hideLoading } from '../../../Redux/Reducer/loading';
import { showErrorAsync } from '../../../Redux/Reducer/error';

/* request */
import { restaurant } from '../../../Request/restaurant';

export const restSlice = createSlice({
  name: 'rest',
  initialState: {
    restList: {}
  },
  reducers: {
    renderRest:  (state, action) => {
      state.restList = action.payload;
    },
  }
});

export const { renderRest } = restSlice.actions;

export const renderRestList = ()=>{
  return async dispatch => {
    try {
      dispatch(showLoading());
      let result =  await restaurant();
      dispatch(renderRest(result));
      setInterval(() => {
        dispatch(hideLoading());
      }, 1000);
    } catch (err) {
      dispatch(showErrorAsync(err.message));
    }
  };
};

export const restdata = state => state.rest.restList;

export default restSlice.reducer;