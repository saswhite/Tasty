import React,{ useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { get,setCh,setEn,init } from '../../Common/Intl';

/* image */
import logo from '../../Assets/logo.png';
import profileLogo from '../../Assets/profile-icon.png';

/* style */
import './header.scss';

/* action */
import {  showZh,showEn,showProfile,hideProfile,isClick,language } from '../../Redux/Reducer/header';

export default function Header () {

  let initLan = localStorage.getItem('language');

  let lan = useSelector(language);

  let isShow = useSelector(isClick);

  let dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    init();
  }, []);

  /* 获取元素在页面中的绝对位置的x坐标 */
  function getElementLeft (element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null){
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }

    return actualLeft;
  }

  /* 获取元素在页面中的绝对位置的y坐标 */
  function getElementTop (element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null){
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }

    return actualTop;
  }

  useEffect(() => {
    /* 给页面加点击事件 */
    document.addEventListener('mousedown', (e)=>{
      let profile = document.getElementsByClassName('profile-drop-down')[0];
      if(profile !== undefined) {
        let x = getElementLeft(profile);
        let y = getElementTop(profile);
        /* 鼠标点击在profile窗口之外时隐藏 */
        if(e.pageX < x  || e.pageX > (x + profile.offsetWidth) ||  e.pageY < y || e.pageY > (y + profile.offsetHeight)){
          dispatch(hideProfile());
        }
      }
    });
  }, []);

  return (
    <div className="header">
      <div className="container-between vertical left">
        <img src={ logo } alt="" className="logo"/>
      </div>
      <div>
        <img
          src={ profileLogo }
          className="profile-logo"
          onClick={ ()=>{dispatch(showProfile());} }/>
        { isShow ? (<div className="profile-drop-down">
          { location.pathname !== '/order' ? (<button className="order-btn" type="button">
            {get('order').title}
          </button>) : null}
          <div className="language-button">
            <button
              onClick={ async ()=>{await setCh(); dispatch(showZh());} }
              id={ lan === 'zh' || initLan === 'zh' ? 'on-choose' : '' } type="button">中</button>
            <button onClick={ async ()=>{await setEn(); dispatch(showEn());}  }
              id={ lan === 'en' || initLan === 'en' ? 'on-choose' : '' } type="button">En</button>
          </div>
          <button className="profile-button log-out" type="button">{get('logout')}</button>
        </div>) : null}
      </div>
    </div>
  );
}
