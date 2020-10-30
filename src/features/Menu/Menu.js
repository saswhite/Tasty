import React,{ useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import _ from 'lodash';

import { v4 } from 'uuid';

import { getStorage } from '../../Common/utils';

import { get } from '../../Common/Intl';

/* component */
import Header from '../../Components/Header/Header';
import Cart from '../../Components/Cart/Cart';

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
  }, []);

  let rederMenuBox = ()=>{

    if(menuList['categories']) {
      if(menuList['foods'].length !== 0) {
        console.log(menuList['foods'].length);
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
