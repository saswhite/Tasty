import React,{ useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment-timezone';

import _ from 'lodash';

import { v4 } from 'uuid';

import { getStorage } from '../../Common/utils';

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

  let dispatch = useDispatch();

  let params = useParams();

  let restInfo = getStorage('restaurant');

  let initLan = getStorage('language');

  let menuList = useSelector(renderMenu);

  useEffect(() => {
    // init();
    dispatch(sendRequestMenu(params.id));
  }, []);

  useEffect(()=>{
    init();
  },[ lan ]);

  /* 30s检测开关点 */
  useEffect(()=>{
    console.log(restInfo);
    let date = new Date();
    var newYork = moment.tz(date,'America/New_York');
    let checkTime = newYork.hours() * 60 + newYork.minutes();
    let timer = setInterval(()=>{
      let isOpen = true;
      if(restInfo.closed){
        isOpen = false;
      }else{
        _.map(restInfo.hours,(item)=>{
          if(item.dayOfWeek == newYork.day() && item.start <= checkTime && checkTime <= item.end){
            isOpen = true;
          }else{
            isOpen = false;
          }
        });
      }
      if(!isOpen){
        dispatch(showErrorAsync('该店已关闭！'));
      }
    },10000);
    return ()=>{
      if(timer){
        clearInterval(timer);
      }
    };
  },[]);

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
