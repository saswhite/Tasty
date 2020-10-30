import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './cart.scss';
import closeImg from '../../Assets/close_btn.png';
import logo from '../../Assets/logo.png';
import alipay from '../../Assets/alipay_big.png';
import wechat from '../../Assets/wechat_big.png';
import apple from '../../Assets/applepay.png';
import { setStorage,getStorage } from '../../Common/utils';
import CartBox from '../CartBox/CartBox';
import _ from 'lodash';

export default function Cart () {

  let initLan = getStorage('language');

  const [ choice,setChoice ] = useState();
  const [ isShow,setIsShow ] = useState(false);
  const [ isExpand,setIsExpand ] = useState(false);

  // const [ totalPrice ] = useState(0.00);

  const array = useSelector(state => state.count.array);

  function setPayment (img,value){
    setChoice(img);
    setStorage('payment',String(value));
  }

  let renderCartList = (list)=>{
    return _.map(list,(item)=>{
      return (
        <CartBox item={ item }   key={ Math.random() }></CartBox>
      );
    });
  };

  let renderTotal = ()=>{

    let list = [];
    _.forIn(_.groupBy(array,`name[${initLan}]`),(value,key)=>{
      let item = {
        title:'',
        count : 0,
        price: 0
      };
      item.title = key.toString();
      item.count = value.length;
      item.price = value[0].price;
      list.push(item);
    });
    let total =  _.reduce(list, (sum, item)=> {
      return sum + item.count * (item.price / 100).toFixed(2);
    }, 0);

    console.log('total===>',total);

    return total.toFixed(2);
  };

  /* 测试 */
  function renderMenu (){

    if(array.length > 0){

      let list = [];
      _.forIn(_.groupBy(array,`name[${initLan}]`),(value,key)=>{
        let item = {
          title:'',
          count : 0,
          price: 0
        };
        item.title = key.toString();
        item.count = value.length;
        item.price = value[0].price;
        list.push(item);
      });
      let total =  _.reduce(list, (sum, item)=> {
        return sum + item.count * (item.price / 100).toFixed(2);
      }, 0);

      console.log(total);

      return renderCartList(list);
    }else{
      return <div className='chooseCart'>选择加入购物车</div>;
    }
  }

  return (
    <div className='cart-container container-row' style={{ maxHeight :'707px' }}>
      {isExpand ?
        <div className="cart-close">
          <button className='close-btn' onClick={ ()=>{setIsExpand(false);} }>
            <img src={ closeImg }></img>
          </button>
        </div> : null}
      <div className='cart-expand container-row' style={{ width :isExpand ? '770px' : '320px' }}>
        {/* {isExpand ? */}
        <div className="cart-pay container-col" onClick={ ()=>{setIsShow(!isShow);} }  style={{ height :isExpand ? '100%' : '0px',width :isExpand ? '450px' : '0px',padding :isExpand ? '0 20px' : '0px' }}>
          <img src={ logo }></img>
          <div className='payment-box container-col'>
            {/* 支付方式 */}
            <div className='payment-control cursor' >
              {!choice ? <div>请选择支付方式</div> : <img src={ choice }></img>}
            </div>
            {/* 支付方式下拉选项 */}
            {isShow ?
              <div className='payment-methods container-col'>
                <div className='payment container-row-center'>
                  <div className='container-row-center' onClick={ ()=>{setPayment(alipay,'alipay');} }>
                    <img src={ alipay } className='alipay' ></img>
                  </div>
                </div>
                <div className='payment container-row-center'>
                  <div className='container-row-center' onClick={ ()=>{setPayment(apple,'apple');} }>
                    <img src={ apple } className='apple' ></img>
                  </div>
                </div>
                <div className='payment container-row-center'>
                  <div className='container-row-center' onClick={ ()=>{setPayment(wechat,'wechat');} }>
                    <img src={ wechat } className='wechat' ></img>
                  </div>
                </div>
              </div>
              : null}
          </div>
        </div>
        {/* : null} */}
        <div className='cart-details container-col' >
          <div className='details-main ' style={{ height :isExpand ? '580px' : '' }}>
            {renderMenu()}
          </div>
          <div className='details-ft'>
            {isExpand ?
              <div className='total-price container-between'>
                <span>总价</span>
                <span>{`$ ${renderTotal()}`}</span>
              </div> : null}
            <button onClick={ ()=>{setIsExpand(true);} } style={{ backgroundColor :!isExpand ? 'black ' : ' #0d9e65 ' }}>
              {!isExpand ? `$ ${renderTotal()}` : '确认下单'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
