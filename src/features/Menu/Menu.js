import React,{ useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import _ from 'lodash';

import { v4 } from 'uuid';

import { getStorage } from '../../Common/utils';

import { get } from '../../Common/Intl';

/* component */
import Header from '../../Components/Header/Header';

/* style */
import './menu.scss';

/* action */
import { sendRequestMenu,renderMenu } from './state/reducer';
import MenuBox from '../../Components/MenuBox/MenuBox';

export default function Menu () {

  let dispatch = useDispatch();

  let params = useParams();

  let restInfo = getStorage('restaurant');

  let initLan = getStorage('language');

  let menuList = useSelector(renderMenu);

  useEffect(() => {
    dispatch(sendRequestMenu(params.id));
    console.log(menuList);
  }, []);

  let rederMenuBox = ()=>{
    return _.map(menuList['categories'],(item)=>{
      return (
        <MenuBox title={ item } foods={ menuList['foods'] } key={ v4() }></MenuBox>
      );
    });
  };

  return (
    <div>
      <Header></Header>
      <div className="menu">
        <div className="titleText">{restInfo.name[`${initLan}`]}</div>
        <div className="subTitleText">{get(`tags.${restInfo.tags[0]}`)}</div>
        <div className="menu-box-container">{rederMenuBox()}</div>
      </div>
    </div>
  );
}
