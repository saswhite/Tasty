
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

  /** 渲染菜品前的数量圆圈 */
  let renderCircle = (item)=>{
    let count = 0;
    /** 从localstorage 里获取 购物车里的菜品信息 */
    let cartList =  getStorage('cart');
    /** 用groupBy 返回一个Map 对象 ，value.length 即为菜品数量 */
    let orderCart =  _.groupBy(cartList,'_id');
    _.forIn(orderCart,(value,key)=>{
      if(item._id === key){
        count = value.length;
      }
    });
    console.log(count);
    if(count === 0){
      return null;
    }else {
      return (
        <div className="circle">{count}</div>
      );
    }
  };

  /** 渲染菜品 */
  let renderFoods = ()=>{

    /** 根据每个菜品的种类进行分类 */
    return _.map(_.groupBy(foods,`category.${'_id'}`)[title._id],(item)=>{

      if(item.category._id === title._id){

        return (

          <div
            key={ v4() }
            className='menu-box-item'
            onClick={ ()=>{
              /** 如果这个菜品没有售罄 ，添加至vuex 并存入localstorage */
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