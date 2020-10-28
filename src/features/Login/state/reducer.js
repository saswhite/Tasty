import { createSlice } from '@reduxjs/toolkit';
import { showLoading,hideLoading } from '../../../Redux/Reducer/loading';
import { showErrorAsync } from '../../../Redux/Reducer/error';
import { login } from '../../../Request/login';

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

  return async (dispatch)=>{

    try {
      dispatch(showLoading());

      await login();

    } catch (error) {

      dispatch(showErrorAsync(error.message));
    }finally{

      dispatch(hideLoading());
    }
  };
};

export const user = state => state.user.user;

export default loginSlice.reducer;
