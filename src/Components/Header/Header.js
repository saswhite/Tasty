import React from 'react';

/* image */
import logo from '../../Assets/logo.png';
import profileLogo from '../../Assets/profile-icon.png';

/* style */
import './header.scss';

export default function Header () {
  return (
    <div className="header">
      <div className="container-between vertical left">
        <img src={ logo } alt="" className="logo"/>
      </div>
      <div>
        <img src={ profileLogo } className="profile-logo"/>
        <div className="profile-drop-down">
          <button className="order-btn" type="button">历史订单</button>
          <div className="language-button">
            <button type="button">中</button>
            <button type="button">En</button>
          </div>
          <button className="profile-button log-out" type="button">登出</button>
        </div>
      </div>
    </div>
  );
}
