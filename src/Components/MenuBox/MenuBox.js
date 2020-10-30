import React from 'react';
import propTypes from 'prop-types';
import './menubox.scss';

export default function MenuBox ( { item } ) {
  return (
    <div className='container-between cart-item'>
      <div className='dinner-name'>{item.name}</div>
      <div className='dinner-control container-row' >
        <div className='dinner-price'>${item.price}</div>
        <div className='count-box container-row'>
          <button className='remove-btn' >-</button>
          <span>{item.count}</span>
          <button className='add-btn'>+</button>
        </div>
      </div>
    </div>
  );
}
MenuBox.propTypes = {
  item:propTypes.object
};
