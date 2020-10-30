import React, { useState } from 'react';
import './cart.scss';
import closeImg from '../../Assets/close_btn.png';
import logo from '../../Assets/logo.png';
import alipay from '../../Assets/alipay_big.png';
import wechat from '../../Assets/wechat_big.png';
import apple from '../../Assets/applepay.png';
import { setStorage } from '../../Common/utils';
import MenuBox from '../MenuBox/MenuBox';
import _ from 'lodash';

export default function Cart () {
  const [ choice,setChoice ] = useState();
  const [ isShow,setIsShow ] = useState(false);
  const [ isExpand,setIsExpand ] = useState(false);

  function setPayment (img,value){
    setChoice(img);
    setStorage('payment',String(value));
  }

  /* 测试 */
  function renderMenu (){
    const arr = [
      { name:'白菜段',price:20,count:1 },
      { name:'玉米',price:15,count:1 },
      { name:'玉米',price:15,count:1 },
      { name:'玉米',price:15,count:1 },
      { name:'玉米',price:15,count:1 },
      { name:'玉米',price:15,count:1 },
    ];
    return _.map(arr,(item)=>{
      // console.log(item);
      return (
        <MenuBox item={ item } key={ Math.random() }></MenuBox>
      );
    });
  }
  return (
    <div className='cart-container container-row' style={{ maxHeight :'707px' }}>
      {isExpand ?
        <div className="cart-close">
          <button className='close-btn' onClick={ ()=>{setIsExpand(false);} }>
            <img src={ closeImg }></img>
          </button>
        </div> : null}

      <div className='cart-expand container-between'>
        {isExpand ?
          <div className="cart-pay container-col" onClick={ ()=>{setIsShow(!isShow);} }>
            <img src={ logo }></img>
            <div className='payment-box container-col'>
              {/* 支付方式 */}
              <div className='payment-control'>
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
                </div> : null
              }
            </div>
          </div> : null}
        <div className='cart-details container-col' style={{ height :isExpand ? '600px' : '' }}>
          <div className='details-main '>
            {renderMenu()}
          </div>
          <div className='details-ft'>

            <button onClick={ ()=>{setIsExpand(true);} }>
              {!isExpand ? '$999' : '确认下单'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
