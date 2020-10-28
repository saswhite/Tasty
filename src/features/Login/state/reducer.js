import { createSlice } from '@reduxjs/toolkit';
import { showLoading,hideLoading } from '../../../Redux/Reducer/loading';
import { showErrorAsync } from '../../../Redux/Reducer/error';
import { login } from '../../../Request/login';
import { setStorage } from '../../../Common/utils';

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

export const { userInfo } = loginSlice.actions;

/**  发送登录请求 */
export const sendRequestLogin = (data)=>{

  return async (dispatch)=>{

    try {
      dispatch(showLoading());

      const loginRes = await login(data);

      /** 存入locastorage */
      setStorage('user',loginRes);

      return true;

    } catch (error) {

      dispatch(showErrorAsync(error.message));
    }finally{

      dispatch(hideLoading());
    }
  };
};

export const user = state => state.login.user;

export default loginSlice.reducer;
