import React ,{ useEffect, useState }from 'react';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import Moment from 'moment';
// import _ from 'lodash';
// import { v4 } from 'uuid';

/** 语言 */
import { language  } from '../../Redux/Reducer/header';
import{ init } from '../../Common/Intl';

import './orderBox.scss';

export default function OrderBox ({ data }) {
  let lan = useSelector(language);

  let [ cartList,setCartList ] = useState([]);

  useEffect(() => {
    init();
  }, [ lan ]);

  useEffect(()=>{

    getCartItemCount();
    renderCartItem();

  },[]);

  /** 获取每一个item 的菜单 去重 以及获取每个菜的数量 */
  function getCartItemCount (){
    let list = new Map();
    // let array = [];
    data.cart.forEach(item => {

      // let obj = { name:item.name[`${lan}`],price:item.totalPrice };
      let obj =  { price:item.totalPrice,count:1 };

      if (!item.name) {
        //新插入一个菜单，代表这个菜第一次被点
        list.set(item.name,{ price:item.totalPrice,count:1 });

      } else {
        //如果菜单已经存在，获取之前计算的次数，然后+1
        list.set(item.name, { ...obj,count:obj.count + 1 });
      }
    });

    /** 将 Map 转为数组 */
    console.log(list);
    setCartList(list);

    // return setCartList([ ...list ]);

  }

  function renderCartItem (){
    console.log(cartList);
    cartList.forEach((value,key)=>{
      console.log('key',key);
      console.log(value);
    });
  }

  return (
    <div className='order-box'>
      <div className='order-title'>
        <div className='title-text order-item-name'>
          { data.restaurant.name[`${lan}`] }
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
          <button className='normal-btn'>更多</button>
        </div>
      </div>
    </div>
  );
}
OrderBox.propTypes = {
  data:propTypes.object
};
