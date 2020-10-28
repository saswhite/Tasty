import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { v4 } from 'uuid';

/* component */
import Header from '../../Components/Header/Header';
import OrderBox from '../../Components/OrderBox/OrderBox';

/** actions */

import { getOrderList ,orderList } from './state/reducer';

/** scss */
import './order.scss';

export default function Order () {

  const dispatch = useDispatch();
  const list = useSelector(orderList);

  useEffect(() => {

    dispatch(getOrderList());

  }, []);
  /** 渲染右侧历史订单列表 */
  function renderOrderList (){
    return _.map(list,(item)=>{
      return (
        <div key={ v4() }>
          <OrderBox data={ item }></OrderBox>
        </div>
      );
    });
  }

  return (
    <div>
      <Header></Header>
      <div className='content-box'>
        <div className='order-tab'>
          <div>历史订单</div>
          <div className='rectangle'></div>
        </div>
        <div className='order-list'>
          { renderOrderList() }
        </div>

      </div>
    </div>
  );
}
