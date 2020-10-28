import { createSlice } from '@reduxjs/toolkit';
import { showLoading,hideLoading } from '../../../Redux/Reducer/loading';
import { showErrorAsync } from '../../../Redux/Reducer/error';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user:{}
  },
  reducers: {

    userInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userInfo, decrement, incrementByAmount } = loginSlice.actions;

export const getUserInfo = ()=>{

  return (dispatch)=>{

    try {
      dispatch(showLoading());

    } catch (error) {

      dispatch(showErrorAsync('eee'));
    }finally{

      dispatch(hideLoading());
    }
  };
};

export const user = state => state.user.user;

export default loginSlice.reducer;
