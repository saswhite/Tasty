import { createSlice } from '@reduxjs/toolkit';

import { setStorage,getStorage } from '../../../Common/utils';

export const countSlice = createSlice({
  name: 'count',
  initialState: {
    value: 1,
    array: getStorage('cart') || []
  },
  reducers: {
    add: (state) => {
      state.value += 1;
    },
    remove: state => {
      state.value -= 1;
    },
    push: (state,action) =>{
      state.array = [ ...state.array,action.payload ];
      setStorage('cart',state.array);
      console.log(state.array);
    }
  },
});

/**  发送登录请求 */
export const pushItem = (item)=>{
  return  (dispatch)=>{
    dispatch(push(item));
  };
};

export const { add, remove,push } = countSlice.actions;

export const ControlCount = state => state.count.value;

export const cart = state => state.count.array;

export default countSlice.reducer;
