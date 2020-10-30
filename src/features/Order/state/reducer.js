import { createSlice } from '@reduxjs/toolkit';
import { showErrorAsync } from '../../../Redux/Reducer/error';
import { hideLoading, showLoading } from '../../../Redux/Reducer/loading';
import { getOrder } from '../../../Request/order';
// import { getStorage } from '../../../Common/utils';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    list:[]
  },
  reducers: {
    updateList:(state, action) => {
      state.list = action.payload;
    },
  },
});

export const { updateList } = orderSlice.actions;

/** 获取 历史订单列表 */
export const getOrderList = ()=>{
  return async (dispatch)=>{
    try {
      dispatch(showLoading);
      // let id = getStorage('user')._id;
      const data = await getOrder();

      dispatch(updateList(data.list));

    } catch (error) {

      dispatch(showErrorAsync(error.message));

    }finally{

      dispatch(hideLoading);
    }
  };
};

export const orderList = state => state.order.list;

export default orderSlice.reducer;
