import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { v4 } from 'uuid';

import { init,get } from '../../Common/Intl';

/* component */
import Header from '../../Components/Header/Header';
import OrderBox from '../../Components/OrderBox/OrderBox';

/** actions */
import { language } from '../../Redux/Reducer/header';
import { getOrderList ,orderList } from './state/reducer';

/** scss */
import './order.scss';

export default function Order () {

  let lan = useSelector(language);

  const dispatch = useDispatch();
  const list = useSelector(orderList);

  useEffect(() => {
    init();
    dispatch(getOrderList());

  }, []);

  useEffect(() => {
    init();
  }, [ lan ]);

  /** 渲染右侧历史订单列表 */
  function renderOrderList (){
    return _.map(list,(item,index)=>{
      return (
        <div key={ v4() } className='container-row-center'>
          <OrderBox data={ item } index={ index }></OrderBox>
        </div>
      );
    });
  }

  return (
    <div>
      <Header></Header>
      <div className='content-box'>
        <div className='order-tab'>
          <div>{get( `order.${'title'}`)}</div>
          <div className='rect-tangle'></div>
        </div>
        <div className='order-list'>
          { renderOrderList() }
        </div>

      </div>
    </div>
  );
}

