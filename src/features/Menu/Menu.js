import React,{ useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import _ from 'lodash';

import { v4 } from 'uuid';

import { getStorage } from '../../Common/utils';

import { get,init } from '../../Common/Intl';

/* component */
import Header from '../../Components/Header/Header';
import Cart from '../../Components/Cart/Cart';
import MenuBox from '../../Components/MenuBox/MenuBox';

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
    init();
    dispatch(sendRequestMenu(params.id));
  }, []);

  useEffect(()=>{
    init();
  },[ lan ]);

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
