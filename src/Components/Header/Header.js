import React,{ useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation,useHistory } from 'react-router-dom';
import _ from 'lodash';

/* common */
import { get,setCh,setEn,init } from '../../Common/Intl';
import { loginPass, orderPass } from '../../Common/passurl';
import { getStorage } from '../../Common/utils';

/* image */
import logo from '../../Assets/logo.png';
import profileLogo from '../../Assets/profile-icon.png';

/* style */
import './header.scss';

/* action */
import {  showZh,showEn,showProfile,hideProfile,isClick,language } from '../../Redux/Reducer/header';
import { showLoading,hideLoading } from '../../Redux/Reducer/loading';

export default function Header () {

  let initLan = getStorage('language');

  let initUser = getStorage('user');

  let [ isLogout,setIsLogout ] = useState(false);

  let lan = useSelector(language);
  /** 小窗口显示与否 */
  let isShow = useSelector(isClick);

  let dispatch = useDispatch();

  let location = useLocation();

  let history = useHistory();

  useEffect(() => {
    init();
    renderHistoryBtn();
  }, []);

  /** 点击历史订单 */
  let pushOrder = ()=>{
    dispatch(showLoading());
    setInterval(() => {
      dispatch(hideLoading());
    },500);
    history.push('/order');
  };

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

  /* profile窗口 */
  let renderProfile = ()=>{
    if(isShow){
      return (<div className="profile-drop-down">
        { renderHistoryBtn() }
        <div className="language-button">
          <button
            onClick={ async ()=>{await setCh(); dispatch(showZh());} }
            id={ lan === 'zh-CN' || initLan === 'zh-CN' ? 'on-choose' : '' }
            type="button">中</button>
          <button onClick={ async ()=>{await setEn(); dispatch(showEn());}  }
            id={ lan === 'en-US' || initLan === 'en-US' ? 'on-choose' : '' } type="button">En</button>
        </div>
        { renderLogoutBtn() }
      </div>);
    }else {
      return null;
    }
  };

  /* 历史订单按钮 */
  let renderHistoryBtn = ()=>{
    if(_.includes(loginPass,location.pathname)){//如果在login页面里面
      return null;
    }else{//如果不在login页面里面
      if(_.includes(orderPass,location.pathname)){//如果在order页面里面
        if(isLogout){//如果点了登出按钮
          return (<button
            className="profile-button log-out"
            onClick={ ()=>{
              setIsLogout(true);
              history.push('/login');
            } }
            type="button">{get('login.login')}</button>);
        }
      }else {//如果不在order页面里面
        if(initUser){//如果登陆了
          if(isLogout) {//如果点了登出按钮
            return (<button
              className="profile-button log-out"
              onClick={ ()=>{
                setIsLogout(true);
                history.push('/login');
              } }
              type="button">{get('login.login')}</button>);
          }else {//一般情况下
            return (<button className="order-btn"
              onClick={ pushOrder }
              type="button">
              {get('order').title}
            </button>);
          }
        }else {//如果没有登陆
          return (<button
            className="profile-button log-out"
            onClick={ ()=>{
              setIsLogout(true);
              history.push('/login');
            } }
            type="button">{get('login.login')}</button>);
        }
      }
    }
  };

  /* 登出按钮 */
  let renderLogoutBtn = ()=>{
    if((!_.has(loginPass,location.pathname) && isLogout === false) && initUser){
      return (<button
        className="profile-button log-out"
        onClick={ ()=>{
          setIsLogout(true);
          localStorage.removeItem('user');
        } }
        type="button">{get('logout')}</button>);
    }else {
      return null;
    }
  };

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
        <img src={ logo } alt="" className="logo" onClick={ ()=>{history.push('/restaurant');} }/>
      </div>
      <div>
        <img
          src={ profileLogo }
          className="profile-logo"
          onClick={ ()=>{
            dispatch(showProfile());
          } }/>
        {  renderProfile() }
      </div>
    </div>
  );
}
