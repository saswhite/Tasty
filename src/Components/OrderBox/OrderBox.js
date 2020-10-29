import React ,{ useEffect, useState }from 'react';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import Moment from 'moment';
import _ from 'lodash';
import { v4 } from 'uuid';

/** 语言 */
import { language  } from '../../Redux/Reducer/header';
import { init } from '../../Common/Intl';

import { getStorage } from '../../Common/utils';

import './orderBox.scss';

export default function OrderBox ({ data }) {
  let lan = useSelector(language);

  let initLan = getStorage('language');

  let [ scale,setScale ] = useState(false);

  useEffect(() => {

    init();

  }, [ lan ]);

  useEffect(()=>{
    init();
    getCartItemCount();

  },[]);

  /** 获取每一个 购物车 的菜单 去重 以及获取每个菜的数量 */
  function getCartItemCount (){
    let cart = data.cart;
    let array = [];
    for (let i = 0; i < cart.length; i++){
      let count = 0;
      for (let j = 0; j <= cart.length - 1; j++) {
        if(cart[i]._id === cart[j]._id){
          count += 1;

          array[i] = { name:cart[i].name,price:cart[i].price,count:count };
        }
      }
    }

    return _.uniqWith(array, _.isEqual);
  }

  /**  渲染中间菜品 */
  function renderCartItem (){
    let list = getCartItemCount();
    return _.map(list,(item)=>{
      return(
        <div className='cart-item container-row container-between' key={ v4() }>
          <div className='cart-item-name'>{item.name[`${initLan}`]}</div>
          <div className='container-row'>
            <div> ${ Number(item.price ) * Number(item.count) } </div>
            <div className='cart-item-count-no-editable'>{item.count}</div>
          </div>
        </div>
      );
    });
  }

  function changeScale (){
    setScale(true);
    console.log(scale);
  }

  return (
    <div className={ `order-box ${scale ? 'order-box-bigger' : ''} ` }>
      <div className='order-title'>
        <div className='title-text order-item-name'>
          { data.restaurant.name[`${initLan}`] }
        </div>
        <div className='sub-title-text'>
          { Moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss') }
        </div>
      </div>
      <div className='order-items'>
        { renderCartItem() }
      </div>
      <div className='order-footer'>
        <div className='order-total container-row container-between'>
          <div className='total-content'>总价: </div>
          <div className='total-price'>$</div>
        </div>
        <div className='more-btn container-row-center'>
          <button className='normal-btn' onClick={ changeScale }>更多</button>
        </div>
      </div>
    </div>
  );
}
OrderBox.propTypes = {
  data:propTypes.object
};