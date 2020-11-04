import React ,{ useEffect, useState,useRef }from 'react';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import Moment from 'moment';
import _ from 'lodash';
import { v4 } from 'uuid';

/* img */
import logoLocal from '../../Assets/logo.png';

/* action  */
import { language  } from '../../Redux/Reducer/header';

/* common  */
import { init ,get } from '../../Common/Intl';
import { getStorage,groupMap,getTotalPrice } from '../../Common/utils';

/** style */
import './orderBox.scss';

export default function OrderBox ({ data }) {

  let lan = useSelector(language);//保存的语言环境

  let initLan = getStorage('language');//初始化的语言环境

  let [ scale,setScale ] = useState(false);//是否点击订单盒子

  const orderItemRef = useRef(null);

  /* 点击语言按钮切换语言环境 */
  useEffect(() => {
    init();
  }, [ lan ]);

  useEffect(()=>{
    /* 语言环境初始化 */
    init();
  },[]);

  /**  渲染中间菜品 */
  function renderCartItem (){
    let list = groupMap(data.cart);
    return _.map(list,(item)=>{
      return(
        <div className='cart-item container-row container-between' key={ v4() }>
          <div className='cart-item-name'>{item.title}</div>
          <div className='container-row'>
            {scale ? <div className='cart-item-price'> ${(( Number(item.price ) * Number(item.count)) / 100).toFixed(2)} </div> : <div></div>}
            <div className='cart-item-count-no-editable'>{item.count}</div>
          </div>
        </div>
      );
    });
  }

  /** 点击更多 展开item */
  function changeScale (){

    setScale(true);
    /* 监听事件 */
    document.addEventListener('mousedown',clickDropDown);
  }

  /* 检测是否点出这个item外 */
  function clickDropDown (e){
    /* html之DOM方法contains–检测节点下是否包含指定节点 */
    if(!orderItemRef.current.contains(e.target)){

      setScale(false);
      /* 移除监听事件 */
      document.removeEventListener('mousedown',clickDropDown);
    }
  }
  return (
    <div className={ `order-box ${scale ? 'order-box-bigger' : ''} ` } ref={ orderItemRef } >
      <div className='order-title '>
        <div className='title-text order-item-name'>
          {/* 餐馆名称 */}
          { data.restaurant.name[`${initLan}`] }
        </div>
        <div className='sub-title-text order-item-time'>
          {/* 订单创建时间 */}
          {Moment(data.createdAt).format('YYYY-MM-DD HH:mm')}
        </div>
      </div>
      <div className='order-items'>
        { renderCartItem() }
      </div>
      <div className='order-footer'>
        {scale ? <div className='container-row-center'><img src={ logoLocal }></img></div> : <div></div>}
        <div className='order-total container-row container-between'>
          {/* 总价 */}
          <div className='total-content'>{get(`menu.${'total'}`)} </div>
          <div className='total-price'>$ {getTotalPrice(data.cart)}</div>
        </div>
        <div className='more-btn container-row-center'  onClick={ changeScale }>
          {/* 更多信息 */}
          <button className='normal-btn'>{get(`order.${'more'}`)}</button>
        </div>
      </div>
    </div>
  );
}
OrderBox.propTypes = {
  data:propTypes.object,
};