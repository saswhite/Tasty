import React,{ useState,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation,useHistory } from 'react-router-dom';
import _ from 'lodash';

/* common */
import { get,setLan } from '../../Common/Intl';
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
import { clearUserInfo } from '../../Features/Login/state/reducer';

export default function Header () {

  const initLan = getStorage('language');//初始化的语言
  const initUser = getStorage('user');//初始化的用户信息

  const [ isLogout,setIsLogout ] = useState(false);/* 是否点击登出按钮 */
  // const [ profileRef,setProfileRef ] = useState();

  const profileRef = useRef();
  const lan = useSelector(language);//保存的语言环境
  const isShow = useSelector(isClick);//配置菜单是否显示

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  let handleClickOutside = (e)=>{
    if(profileRef.current && !profileRef.current.contains(e.target)){
      dispatch(hideProfile());
      document.removeEventListener('mousedown', handleClickOutside);
    }
  };

  /** 点击历史订单 */
  let pushOrder = ()=>{
    dispatch(showLoading());
    history.push('/order');
    dispatch(hideLoading());
  };

  /* profile窗口的渲染 */
  let renderProfile = ()=>{
    if(isShow){
      return (
        <div className="profile-drop-down" ref={ profileRef }>
          { renderLoginBtn()}{/* 登陆按钮 */}
          {renderOrderBtn() }{/* 订单按钮 */}
          <div className="language-button">
            {/* 中文按钮 */}
            <button
              onClick={ async ()=>{await setLan('zh-CN'); dispatch(showZh());} }
              id={ lan === 'zh-CN' || initLan === 'zh-CN' ? 'on-choose' : '' }
              type="button">中</button>
            {/* 英文按钮 */}
            <button onClick={ async ()=>{await setLan('en-US'); dispatch(showEn());}  }
              id={ lan === 'en-US' || initLan === 'en-US' ? 'on-choose' : '' } type="button">En</button>
          </div>
          { renderLogoutBtn() }
        </div>);
    }else {
      return null;
    }
  };

  /* 登陆按钮 */
  let renderLoginBtn = ()=>{
    if(_.includes(loginPass,location.pathname)){
      return null;
    }else {
      if(isLogout || !initUser) {
        return (<button
          className="profile-button log-out"
          onClick={ ()=>{
            setIsLogout(true);
            history.push('/login');
          } }
          type="button">{get('login.login')}</button>);
      }else{
        return null;
      }
    }
  };

  /* 订单按钮 */
  let renderOrderBtn = ()=>{
    if(_.includes(loginPass,location.pathname) || _.includes(orderPass,location.pathname)){
      return null;
    }else {
      if(initUser && !isLogout ) {
        return (<button className="order-btn"
          onClick={ pushOrder }
          type="button">
          {get('order').title}
        </button>);
      }else {
        return null;
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
          dispatch(clearUserInfo());
        } }
        type="button">{get('logout')}</button>);
    }else {
      return null;
    }
  };

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
            document.addEventListener('mousedown', handleClickOutside);
          } }/>
        {  renderProfile() }
      </div>
    </div>
  );
}
