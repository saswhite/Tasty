import React, { useState, useEffect } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import _ from 'lodash';
import { useParams,useHistory } from 'react-router-dom';

/* style */
import './cart.scss';

/* img */
import closeImg from '../../Assets/close_btn.png';
import logo from '../../Assets/logo.png';
import alipay from '../../Assets/alipay_big.png';
import wechat from '../../Assets/wechat_big.png';
import apple from '../../Assets/applepay.png';

/* common */
import { setStorage,getStorage } from '../../Common/utils';
import{ init,get  } from '../../Common/Intl';

/* action */
import { checkOrder } from './state/action';
import CartBox from '../CartBox/CartBox';
import { push,splice,clear } from '../MenuBox/state/reducer';
import { language  } from '../../Redux/Reducer/header';
import { disabled,setIsDisabledTrue,setIsDisabledFalse } from '../../Features/Menu/state/reducer';

export default function Cart () {

  const lan = useSelector(language);//获取redux里面保存的语言环境

  const array = useSelector(state => state.count.array);//获取rudex里面保存的购物车列表

  const isDisabled = useSelector(disabled);//获取redux下单按钮可不可以被点的状态

  const initLan = getStorage('language');//获取初始化的语言环境

  const cartId = getStorage('cartid');//获取保存的餐馆id

  const cartList = getStorage('cart');//获取保存的购物车列表

  const params = useParams();

  const dispatch = useDispatch();

  const history = useHistory();

  /* 当保存的购物车列表变化的时候给下单按钮的点击状态更新 */
  useEffect(() => {
    renderDisabled();
  }, [ cartList.length ]);

  /* 当点击中英文按钮之后切换语言环境 */
  useEffect(()=>{
    init();
  },[ lan ]);

  const [ choice,setChoice ] = useState();//设置支付方式
  const [ isShow,setIsShow ] = useState(false);//显示购物车菜单
  const [ isExpand,setIsExpand ] = useState(false);//点击总价按钮之后

  /* 页面元素已经加载好之后 */
  useEffect(()=>{
    /*如果切换了菜单页面，给购物车id清空 */
    if(params.id !== cartId){
      setStorage('cart',[]);
      renderCartList([]);
    }
    /* 确认之前的支付方式 */
    let payment = getStorage('payment');
    let checkRest = getStorage('restaurant');
    if(payment){
      if (payment === 'alipay'){
        setChoice(alipay);
      }else if(payment == 'wechat'){
        setChoice(wechat);
      }else{
        setChoice(apple);
      }
    }
    /* 如果切换了餐馆的菜单页面给购物车清空 */
    if(checkRest){
      if(array.length > 0){
        if(array[0].restaurant._id !== checkRest._id){
          dispatch(clear());
        }
      }
    }
  },[]);

  /* 判断购物车列表是否是空的来决定下单按钮点击的状态 */
  let renderDisabled = ()=>{
    if(cartList === []){
      dispatch(setIsDisabledTrue());
    }else {
      dispatch(setIsDisabledFalse());
    }
  };

  /* 切换支付方式 */
  let setPayment = (img,value)=>{
    setChoice(img);
    setStorage('payment',String(value));
  };

  /* 返回购物车里面的每一项的渲染 */
  let renderCartList = (list)=>{
    return _.map(list,(item)=>{
      return (
        <CartBox item={ item }  add={ (name)=>{add(name);} }  minus={ (_id)=>{minus(_id);} }  key={ Math.random() }></CartBox>
      );
    });
  };

  /* 返回购物车里面要使用的列表和每一项要用的数据 */
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

  /* 返回总价 */
  let renderTotal = ()=>{
    let arr = renderList();
    let total =  _.reduce(arr, (sum, item)=> {
      return sum + item.count * (item.price / 100).toFixed(2);
    }, 0);
    return total.toFixed(2);
  };

  /* 决定购物车菜单的显示状态 */
  let renderMenu = ()=>{
    if(array.length > 0){
      let arr = renderList();
      return renderCartList(arr);
    }else{
      dispatch(setIsDisabledTrue());
      return <div className='chooseCart'>{get(`menu.${'cartTitle'}`)}</div>;
    }
  };

  /* 购物车每一项的增加按钮 */
  let add = (name)=>{
    _.forIn(_.groupBy(array,`name[${initLan}]`),(value,key)=>{
      if(name === key){
        dispatch(push(value[0]));
      }
    });
  };

  /* 返回购物车里面指定项的坐标 */
  let itemCount = (val)=>{
    return _.findIndex(array,{
      '_id': val
    });
  };

  /* 购物车每一项的减少按钮 */
  let minus = (_id)=>{
    let minusCount = itemCount(_id);
    dispatch(splice(minusCount));
    renderDisabled();
  };

  /* 设置点了订单按钮之后要保存的数据 */
  let orderClick = ()=>{
    let orderInfo = {
      payment:getStorage('payment') || '',
      cart:array,
      userId:getStorage('user') ? getStorage('user')._id : '',	// 用户id
      restaurantId:getStorage('restaurant')._id  // 餐馆id
    };
    dispatch(checkOrder(orderInfo,history));
  };

  return (
    /* 购物车整体 */
    <div className='cart-container container-row' style={{ maxHeight :'707px' }}>
      {isExpand ?
        <div className="cart-close">
          {/* 关闭按钮 */}
          <button className='close-btn' onClick={ ()=>{setIsExpand(false);} }>
            <img src={ closeImg }></img>
          </button>
        </div> : null}
      <div className='cart-expand container-row' style={{ width :isExpand ? '770px' : '320px' }}>
        <div className="cart-pay container-col" onClick={ ()=>{setIsShow(!isShow);} }  style={{ height :isExpand ? '100%' : '0px',width :isExpand ? '450px' : '0px',padding :isExpand ? '0 20px' : '0px' }}>
          <img src={ logo }></img>
          <div className='payment-box container-col'>
            {/* 支付方式 */}
            <div className='payment-control cursor' >
              {/* 选择支付方式 */}
              {!choice ? <div>{get(`menu.${'choose-payment'}`)}</div> : <img src={ choice }></img>}
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
        <div className='cart-details container-col' >
          <div className='details-main ' style={{ height :isExpand ? '580px' : '' }}>
            {renderMenu()}
          </div>
          <div className='details-ft'>
            {isExpand ?
              <div className='total-price container-between'>
                <span>{get(`menu.${'total'}`)}</span>{/* 总价 */}
                <span>{`$ ${renderTotal()}`}</span>
              </div> : null}
            {isExpand ?
              <button onClick={ orderClick } style={{ backgroundColor :!isExpand ? 'black ' : ' #0d9e65 ' }}>
                {get(`menu.${'place-order'}`)}{/* 确认下单 */}
              </button> :
              <button
                className={ isDisabled ? 'cart-disabled-btn' : 'cart-btn' }
                onClick={ ()=>{setIsExpand(true);} }
                style={{ backgroundColor :!isExpand ? 'black ' : ' #0d9e65 ' }}
                disabled={ isDisabled }>
              ${renderTotal()}
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
