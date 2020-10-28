import { createSlice } from '@reduxjs/toolkit';
// import { showLoading,hideLoading } from '../../../Redux/Reducer/loading';
// import { showErrorAsync } from '../../../Redux/Reducer/error';
// import { login } from '../../../Request/login';
// import { setStorage } from '../../../Common/utils';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    list:[]
  },
  reducers: {

  },
});

// export const {  } = orderSlice.actions;

export const list = state => state.order.list;

export default orderSlice.reducer;
