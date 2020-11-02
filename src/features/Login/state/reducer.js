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
    clearUserInfo:state =>{
      state.user = {};
    }
  },
});

export const { userInfo ,clearUserInfo } = loginSlice.actions;

/**  发送登录请求 */
export const sendRequestLogin = (data)=>{

  return async (dispatch)=>{

    try {
      dispatch(showLoading());

      const loginRes = await login(data);

      /** 存入locastorage */
      setStorage('user',loginRes);
      console.log(loginRes);

      dispatch(userInfo(loginRes));

      // return getStorage('user');

    } catch (error) {

      dispatch(showErrorAsync(error.message));
    }finally{

      dispatch(hideLoading());
    }
  };
};

export const user = state => state.login.user;

export default loginSlice.reducer;
