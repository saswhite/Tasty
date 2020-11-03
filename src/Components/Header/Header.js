import React,{ useEffect,useState,useRef } from 'react';
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

  /* 页面元素刚加载的时候 */
  useEffect(() => {
    /* 给历史订单按钮的状态初始化 */
    // renderHistoryBtn();
    /* 给页面加点击事件 */
    document.addEventListener('mousedown', handleClickOutside);
    // return () => {
    //   document.removeEventListener('mousedown', handleClickOutside);
    // };
  }, []);

  let handleClickOutside = (e)=>{
    if(profileRef.current && !profileRef.current.contains(e.target)){
      dispatch(hideProfile());
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
          { renderHistoryBtn() }
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

  /* 历史订单按钮 */
  let renderHistoryBtn = ()=>{
    if(_.includes(loginPass,location.pathname)){//如果在login页面里面
      return null;
    }else{//如果不在login页面里面
      if(_.includes(orderPass,location.pathname)){//如果在order页面里面
        if(isLogout){//如果点了登出按钮
          return renderLoginBtn();
        }
      }else {//如果不在order页面里面
        if(initUser){//如果登陆了
          return (
            <div>
              {isLogout ? renderLoginBtn() : renderOrderBtn()}
            </div>
          );
        }else {//如果没有登陆
          return renderLoginBtn();
        }
      }
    }
  };

  /*  */
  let renderLoginBtn = ()=>{
    return (<button
      className="profile-button log-out"
      onClick={ ()=>{
        setIsLogout(true);
        history.push('/login');
      } }
      type="button">{get('login.login')}</button>);
  };

  let renderOrderBtn = ()=>{
    return (<button className="order-btn"
      onClick={ pushOrder }
      type="button">
      {get('order').title}
    </button>);
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

          } }/>
        {  renderProfile() }
      </div>
    </div>
  );
}
