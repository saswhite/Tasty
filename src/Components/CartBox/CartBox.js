import React from 'react';
import propTypes from 'prop-types';
import './cartBox.scss';

export default function MenuBox ( { item,add,minus } ) {

  return (
    <div className='container-between cart-item'>
      <div className='dinner-name'>{item.title }</div>
      <div className='dinner-control container-row' >
        <div className='dinner-price'>${(item.price / 100).toFixed(2)}</div>
        <div className='count-box container-row'>
          <button className='remove-btn'onClick={ ()=> {minus(item._id);} } >-</button>
          <span>{item.count}</span>
          <button className='add-btn' onClick={ ()=> {add(item.title);} }>+</button>
        </div>
      </div>
    </div>
  );
}
MenuBox.propTypes = {
  item:propTypes.object,
  count: propTypes.number,
  add: propTypes.func,
  minus: propTypes.func
};