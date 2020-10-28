import React from 'react';

/* component */
import Header from '../../Components/Header/Header';

/** scss */
import './order.scss';

export default function Order () {
  return (
    <div>
      <Header></Header>
      <div className='content-box'>
        <div className='order-title'>
          历史订单
        </div>
        <div className='order-list'>
          liebiao
        </div>

      </div>
    </div>
  );
}
