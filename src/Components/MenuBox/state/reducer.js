import { createSlice } from '@reduxjs/toolkit';

import { setStorage,getStorage } from '../../../Common/utils';

import _ from 'lodash';

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
      let initLan = getStorage('language');
      state.array = [ ...state.array,action.payload ];
      setStorage('cart',_.sortBy(state.array,`name[${initLan}]`));
    },
    splice:(state,action)=>{
      let initLan = getStorage('language');
      let clone = _.cloneDeep(state.array);
      clone.splice(action.payload,1);
      state.array = clone;
      setStorage('cart',_.sortBy(state.array,`name[${initLan}]`));
    }
  },
});

/**  发送登录请求 */
export const pushItem = (item)=>{
  return  (dispatch)=>{
    dispatch(push(item));
  };
};

export const { add, remove,push,splice } = countSlice.actions;

export const ControlCount = state => state.count.value;

export const cart = state => state.count.array;

export default countSlice.reducer;
