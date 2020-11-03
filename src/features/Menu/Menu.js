import React,{ useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment-timezone';

import _ from 'lodash';

import { v4 } from 'uuid';

import { getStorage, setStorage } from '../../Common/utils';

import { get,init } from '../../Common/Intl';

/* component */
import Header from '../../Components/Header/Header';
import Cart from '../../Components/Cart/Cart';
import MenuBox from '../../Components/MenuBox/MenuBox';
import { showErrorAsync } from '../../Redux/Reducer/error';

/* style */
import './menu.scss';

/* action */
import { sendRequestMenu,renderMenu } from './state/reducer';
import { language } from '../../Redux/Reducer/header';

export default function Menu () {

  const lan = useSelector(language);

  const array = useSelector(state => state.count.array);//获取rudex里面保存的购物车列表

  const dispatch = useDispatch();

  const params = useParams();

  const restInfo = getStorage('restaurant');

  const initLan = getStorage('language');

  const cartList = getStorage('cart');

  const menuList = useSelector(renderMenu);

  useEffect(() => {
    if(!cartList){
      setStorage('cart',array);
    }
    dispatch(sendRequestMenu(params.id));
  }, []);

  useEffect(()=>{
    init();
  },[ lan ]);

  /* 每30s检测 */
  useEffect(()=>{
    let timer = setInterval(()=>{
      let flag = checkOpen();
      if(!flag){
        dispatch(showErrorAsync('该店已关闭'));
      }
    },30000);
    return ()=>{
      if(timer){
        clearInterval(timer);
      }
    };
  },[]);
  /* 检测开关店 */
  function checkOpen (){
    let date = new Date();
    var newYork = moment.tz(date,'America/New_York');
    let checkTime = newYork.hours() * 60 + newYork.minutes();
    let isOpen = true;
    /* 是否人为关闭 */
    if(restInfo.closed){
      isOpen = false;
    }else{
      /* 是否在开店时间内 */
      _.map(restInfo.hours,(item)=>{
        if(item.dayOfWeek == newYork.day() && item.start <= checkTime && checkTime <= item.end){
          isOpen = true;
        }else{
          isOpen = false;
        }
      });
    }
    return isOpen;
  }

  /* 渲染菜单 */
  let rederMenuBox = ()=>{
    if(menuList['categories']) {
      if(menuList['foods'].length !== 0) {
        return _.map(menuList['categories'],(item)=>{
          return (
            <MenuBox title={ item } foods={ menuList['foods'] } key={ v4() }></MenuBox>
          );
        });
      }else {
        return (
          <div>{get(`menu.${'no-menu'}`)}</div>
        );
      }
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="menu">
        <div className="titleText">{restInfo.name[`${initLan}`]}</div>
        <div className="subTitleText">{get(`tags.${restInfo.tags[0]}`)}</div>
        <div className="menu-box-container">{rederMenuBox()}</div>
      </div>
      <Cart></Cart>
    </div>
  );
}
