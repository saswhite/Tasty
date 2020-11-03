import { createSlice } from '@reduxjs/toolkit';

import { setStorage,getStorage } from '../../../Common/utils';

import _ from 'lodash';

export const countSlice = createSlice({
  name: 'count',
  initialState: {
    array: getStorage('cart') || []
  },
  reducers: {
    /* 增加 */
    push: (state,action) =>{
      let initLan = getStorage('language');
      state.array = [ ...state.array,action.payload ];
      setStorage('cart',_.sortBy(state.array,`name[${initLan}]`));
    },
    /* 减少 */
    splice:(state,action)=>{
      let initLan = getStorage('language');
      let clone = _.cloneDeep(state.array);
      clone.splice(action.payload,1);
      state.array = clone;
      setStorage('cart',_.sortBy(state.array,`name[${initLan}]`));
      console.log(state.array);
    },
    /* 清空 */
    clear:(state)=>{
      state.array = [];
      setStorage('cart',[]);
    }
  },
});

/**  发送登录请求 */
export const pushItem = (item)=>{
  return  (dispatch)=>{
    dispatch(push(item));
  };
};

export const { push,splice,clear  } = countSlice.actions;

export const cart = state => state.count.array;

export default countSlice.reducer;
