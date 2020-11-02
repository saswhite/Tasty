import React from 'react';
import propTypes from 'prop-types';

/* style */
import './cartBox.scss';

export default function MenuBox ( { item,add,minus } ) {

  return (
    <div className='container-between cart-item'>
      {/* 食品名称 */}
      <div className='dinner-name'>{item.title }</div>
      <div className='dinner-control container-row' >
        {/* 食品单价 */}
        <div className='dinner-price'>${(item.price / 100).toFixed(2)}</div>
        <div className='count-box container-row'>
          {/* 食品数量减少按钮 */}
          <button className='remove-btn'onClick={ ()=> {minus(item._id);} } >-</button>
          {/* 食品的数量 */}
          <span>{item.count}</span>
          {/* 食品的数量增加按钮 */}
          <button className='add-btn' onClick={ ()=> {add(item.title);} }>+</button>
        </div>
      </div>
    </div>
  );
}

/* 对传过来的数据进行类型检测 */
MenuBox.propTypes = {
  item:propTypes.object,
  count: propTypes.number,
  add: propTypes.func,
  minus: propTypes.func
};