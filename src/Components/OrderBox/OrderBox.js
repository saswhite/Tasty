import React ,{ useEffect, useState }from 'react';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import Moment from 'moment';
import _ from 'lodash';
import { v4 } from 'uuid';

import logoLocal from '../../Assets/logo.png';

/** 语言 */
import { language  } from '../../Redux/Reducer/header';
import { init ,get } from '../../Common/Intl';

import { getStorage } from '../../Common/utils';
/** scss */
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

  useEffect(() => {
    /* 给页面加点击事件 */
    document.addEventListener('mousedown', (e)=>{
      let profile = document.getElementsByClassName('order-box-bigger')[0];
      if(profile !== undefined) {
        let x = getElementLeft(profile);
        let y = getElementTop(profile);

        /* 鼠标点击在 item 窗口之外时隐藏 */
        if(e.pageX < x  || e.pageX > (x + profile.offsetWidth) ||  e.pageY < y || e.pageY > (y + profile.offsetHeight)){
          setScale(false);
        }
      }
    });
  }, []);

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

    /** 返回一个经过去重 和算过数量的数组 */
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
            {scale ? <div className='cart-item-price'> ${(( Number(item.price ) * Number(item.count)) / 100).toFixed(2)} </div> : <div></div>}
            <div className='cart-item-count-no-editable'>{item.count}</div>
          </div>
        </div>
      );
    });
  }

  /** 计算每个item 的总价 */
  function computePrice (){
    let list = getCartItemCount();
    let price = 0;
    _.map(list,(item)=>{
      price += Number(item.price ) * Number(item.count);
    });
    price = (price / 100).toFixed(2);
    return price;
  }

  /* 获取元素在页面中的绝对位置的x坐标 */
  let getElementLeft = (element)=>{
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null){
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }

    return actualLeft;
  };

  /* 获取元素在页面中的绝对位置的y坐标 */
  let getElementTop = (element)=>{
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null){
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }

    return actualTop;
  };

  /** 点击更多 展开item */
  function changeScale (){
    setScale(true);
  }

  return (
    <div className={ `order-box ${scale ? 'order-box-bigger' : ''} ` } >
      <div className='order-title '>
        <div className='title-text order-item-name'>
          { data.restaurant.name[`${initLan}`] }
        </div>
        <div className='sub-title-text order-item-time'>
          {Moment(data.createdAt).format('YYYY-MM-DD HH:mm')}
        </div>
      </div>
      <div className='order-items'>
        { renderCartItem() }
      </div>
      <div className='order-footer'>
        {scale ? <div className='container-row-center'><img src={ logoLocal }></img></div> : <div></div>}
        <div className='order-total container-row container-between'>
          <div className='total-content'>{get(`menu.${'total'}`)} </div>
          <div className='total-price'>$ {computePrice()}</div>
        </div>
        <div className='more-btn container-row-center'  onClick={ changeScale }>
          <button className='normal-btn'>{get(`order.${'more'}`)}</button>
        </div>
      </div>
    </div>
  );
}
OrderBox.propTypes = {
  data:propTypes.object,
};