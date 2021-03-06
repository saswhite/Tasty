import { createSlice } from '@reduxjs/toolkit';
import { showLoading,hideLoading } from '../../../Redux/Reducer/loading';
import { showErrorAsync } from '../../../Redux/Reducer/error';
import { menu } from '../../../Request/menu';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menu:{},
    isDisabled: true
  },
  reducers: {

    menuList: (state, action) => {
      state.menu = action.payload;
    },
    setIsDisabledTrue: state =>{
      state.isDisabled = true;
    },
    setIsDisabledFalse: state =>{
      state.isDisabled = false;
    },
  },
});

export const { menuList,setIsDisabledTrue,setIsDisabledFalse } = menuSlice.actions;

/**  发送登录请求 */
export const sendRequestMenu = (id)=>{

  return async (dispatch)=>{

    try {
      dispatch(showLoading());

      const menuRes = await menu(id);

      /** 存入locastorage */

      dispatch(menuList(menuRes));

      // return getStorage('user');

    } catch (error) {

      dispatch(showErrorAsync(error.message));
    }finally{

      dispatch(hideLoading());
    }
  };
};

export const renderMenu = state => state.menu.menu;

export const disabled = state => state.menu.isDisabled;

export default menuSlice.reducer;
