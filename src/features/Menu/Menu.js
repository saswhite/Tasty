import React,{ useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import _ from 'lodash';

import { v4 } from 'uuid';

import { getStorage, setStorage } from '../../Common/utils';

import { get,init } from '../../Common/Intl';

/* component */
import Header from '../../Components/Header/Header';
import Cart from '../../Components/Cart/Cart';
import MenuBox from '../../Components/MenuBox/MenuBox';
import { showErrorAsync ,hideError } from '../../Redux/Reducer/error';

/* style */
import './menu.scss';

/* action */
import { sendRequestMenu,renderMenu } from './state/reducer';
import { language } from '../../Redux/Reducer/header';

/* function */
import { isClosed } from '../../Common/utils';

export default function Menu () {

  const lan = useSelector(language);

  const array = useSelector(state => state.count.array);//获取rudex里面保存的购物车列表

  const dispatch = useDispatch();

  const params = useParams();

  const restInfo = getStorage('restaurant');

  const initLan = getStorage('language');

  const cartList = getStorage('cart');

  const menuList = useSelector(renderMenu);

  useEffect(() => {
    if(!cartList){
      setStorage('cart',array);
    }
    dispatch(sendRequestMenu(params.id));
  }, []);

  useEffect(()=>{
    init();
  },[ lan ]);

  /* 每30s检测 */
  useEffect(()=>{
    checkOpen();
    let timer = setInterval(()=>{
      checkOpen();
    },30000);
    return ()=>{
      if(timer){
        clearInterval(timer);
        dispatch(hideError());
      }
    };
  },[]);
  /* 检测开关店 */
  function checkOpen (){
    let flag = isClosed(restInfo);
    if(flag){
      dispatch(showErrorAsync('该店已关闭'));
    }
  }

  /* 渲染菜单 */
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
