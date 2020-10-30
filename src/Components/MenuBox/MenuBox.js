
import React,{ useEffect } from 'react';

// import React from 'react';

import PropTypes from 'prop-types';

import _ from 'lodash';

import { v4 } from 'uuid';

import { useDispatch,useSelector } from 'react-redux';

import { getStorage } from '../../Common/utils';

import { pushItem ,cart } from './state/reducer';

/* style */

import './menubox.scss';

export default function MenuBox ({ title,foods }) {

  let initLan = getStorage('language');

  let cartArray = useSelector(cart);

  let dispatch = useDispatch();

  useEffect(() => {
    renderFoods();
  }, [ cartArray ]);

  let renderCircle = (item)=>{
    let count = 0;
    let cartList =  getStorage('cart');
    let orderCart =  _.groupBy(cartList,`category.${'_id'}`);
    _.forIn(orderCart,(value,key)=>{
      if(item.category._id === key){
        count = value.length;
      }
    });
    if(count === 0){
      return null;
    }else {
      return (
        <div className="circle">{count}</div>
      );
    }
  };

  let renderFoods = ()=>{
    return _.map(_.groupBy(foods,`category.${'_id'}`)[title._id],(item)=>{

      if(item.category._id === title._id){

        return (

          <div
            key={ v4() }
            className='menu-box-item'
            onClick={ ()=>{
              if(item.available) {
                dispatch(pushItem(item));
              }
            } }>

            {renderCircle(item)}

            <div style={ item.available ?  {} : { opacity: '0.2' } }>
              {item.name[`${initLan}`]}
            </div>

            <div style={ item.available ?  {} : { opacity: '0.2' } }>${(item.price / 100).toFixed(2)}</div>

          </div>
        );

      }

    });

  };

  return (

    <div style={{ marginBottom : '70px',breakInside :'avoid' }}>

      <div>
        <div className="titleText cursor">
          {title.name[`${initLan}`]}
        </div>
        <div className="rect"></div>
      </div>
      <div className="foods-container cursor">
        {renderFoods()}
      </div>

    </div>

  );

}

MenuBox.propTypes = {

  title:PropTypes.object,

  foods: PropTypes.array

};