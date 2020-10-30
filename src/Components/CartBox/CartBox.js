import React from 'react';
import propTypes from 'prop-types';
import './cartBox.scss';
import { getStorage } from '../../Common/utils';

export default function MenuBox ( { item } ) {

  let initLan = getStorage('language');
  return (
    <div className='container-between cart-item'>
      <div className='dinner-name'>{item.name[`${initLan}`] }</div>
      <div className='dinner-control container-row' >
        <div className='dinner-price'>${(item.price / 100).toFixed(2)}</div>
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