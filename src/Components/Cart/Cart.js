import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import './cart.scss';
import closeImg from '../../Assets/close_btn.png';
import logo from '../../Assets/logo.png';
import alipay from '../../Assets/alipay_big.png';
import wechat from '../../Assets/wechat_big.png';
import apple from '../../Assets/applepay.png';
import { setStorage,getStorage } from '../../Common/utils';
import CartBox from '../CartBox/CartBox';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { push,splice } from '../MenuBox/state/reducer';
import{ init  } from '../../Common/Intl';
import { language  } from '../../Redux/Reducer/header';

export default function Cart () {

  const lan = useSelector(language);

  let initLan = getStorage('language');

  let cartId = getStorage('cartid');

  const array = useSelector(state => state.count.array);

  let params = useParams();

  let dispatch = useDispatch();

  useEffect(() => {
    if(params.id !== cartId){
      setStorage('cart',[]);
      renderCartList([]);
    }
  }, []);

  useEffect(()=>{
    init();
  },[ lan ]);

  const [ choice,setChoice ] = useState();
  const [ isShow,setIsShow ] = useState(false);
  const [ isExpand,setIsExpand ] = useState(false);

  function setPayment (img,value){
    setChoice(img);
    setStorage('payment',String(value));
  }

  let renderCartList = (list)=>{
    return _.map(list,(item)=>{
      return (
        <CartBox item={ item }  add={ (name)=>{add(name);} }  minus={ (_id)=>{minus(_id);} }  key={ Math.random() }></CartBox>
      );
    });
  };

  let renderList = ()=>{
    let list = [];
    _.forIn(_.groupBy(array,`name[${initLan}]`),(value,key)=>{
      let item = {
        title:'',
        count : 0,
        price: 0,
        _id:''
      };
      item.title = key.toString();
      item.count = value.length;
      item.price = value[0].price;
      item._id = value[0]._id;
      list.push(item);
    });

    return list;
  };

  let renderTotal = ()=>{

    let arr = renderList();
    let total =  _.reduce(arr, (sum, item)=> {
      return sum + item.count * (item.price / 100).toFixed(2);
    }, 0);

    return total.toFixed(2);
  };

  /* 测试 */
  function renderMenu (){

    if(array.length > 0){

      let arr = renderList();
      return renderCartList(arr);

    }else{
      return <div className='chooseCart'>选择加入购物车</div>;
    }
  }

  let add = (name)=>{
    _.forIn(_.groupBy(array,`name[${initLan}]`),(value,key)=>{
      if(name === key){
        dispatch(push(value[0]));
      }
    });
  };

  let itemCount = (val)=>{
    return _.findIndex(array,{
      '_id': val
    });
  };

  let minus = (_id)=>{
    let minusCount = itemCount(_id);
    dispatch(splice(minusCount));
  };

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
