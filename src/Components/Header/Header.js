import React,{ useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* image */
import logo from '../../Assets/logo.png';
import profileLogo from '../../Assets/profile-icon.png';

/* style */
import './header.scss';

/* action */
import { showCh , showEn, showProfile,hideProfile,isTransform,isClick } from '../../Redux/Reducer/header';

export default function Header () {

  let isTrans = useSelector(isTransform);

  let isShow = useSelector(isClick);

  let dispatch = useDispatch();

  let hide = ()=>{
    let profile =  document.getElementsByClassName('mask');
    if(profile.length !== 0){
      dispatch(hideProfile());
    }
  };

  useEffect(() => {
    document.onclick = hide;
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
          onClick={ (e)=>{dispatch(showProfile()); e.nativeEvent.stopImmediatePropagation();} }/>
        { isShow ? (<div className="profile-drop-down">
          <button className="order-btn" type="button">历史订单</button>
          <div className="language-button">
            <button onClick={ ()=>{dispatch(showCh());} } id={ isTrans ? '' : 'on-choose' } type="button">中</button>
            <button onClick={ ()=>{dispatch(showEn());} } id={ isTrans ? 'on-choose' : '' } type="button">En</button>
          </div>
          <button className="profile-button log-out" type="button">登出</button>
          <div className="mask"></div>
        </div>) : null}
      </div>
    </div>
  );
}
