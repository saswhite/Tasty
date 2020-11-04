
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { v4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

/* common */
import { getStorage,setStorage } from '../../Common/utils';

/* action */
import { pushItem } from './state/reducer';
import { setIsDisabledTrue,setIsDisabledFalse } from '../../Features/Menu/state/reducer';

/* style */
import './menubox.scss';

export default function MenuBox ({ title,foods }) {

  const cartList = getStorage('cart');//获取保存的购物车列表

  const initLan = getStorage('language');

  const dispatch = useDispatch();

  const params = useParams();

  let renderDisabled = ()=>{
    if(cartList === [] || !cartList){
      dispatch(setIsDisabledTrue());
    }else {
      dispatch(setIsDisabledFalse());
    }
  };

  /** 渲染菜品前的数量圆圈 */
  let renderCircle = (item)=>{
    let count = 0;
    /** 从localstorage 里获取 购物车里的菜品信息 */
    let cartList =  getStorage('cart');
    /** 用groupBy 返回一个Map 对象 ，value.length 即为菜品数量 */
    let orderCart =  _.groupBy(cartList,'_id');
    _.forIn(orderCart,(value,key)=>{
      if(item._id === key){
        count = value.length;
      }
    });

    if(count === 0){
      return null;
    }else {
      return (
        <div className="circle">{count}</div>
      );
    }
  };

  /** 渲染菜品 */
  let renderFoods = ()=>{

    /** 根据每个菜品的种类进行分类 */
    return _.map(_.groupBy(foods,`category.${'_id'}`)[title._id],(item)=>{

      if(item.category._id === title._id){

        return (

          <div
            key={ v4() }
            className='menu-box-item'
            onClick={ ()=>{
              /** 如果这个菜品没有售罄 ，添加至vuex 并存入localstorage */
              if(item.available) {
                dispatch(pushItem(item));
                setStorage('cartid',params.id);
                renderDisabled();
              }
            } }>

            {renderCircle(item)}

            <div style={ item.available ?  {} : { opacity: '0.2' } }>
              {item.name[`${initLan}`]}
            </div>

            <div style={ item.available ?  {} : { opacity: '0.2' } }>${(item.price / 100).toFixed(2)}</div>

          </div>
        );

      }

    });

  };

  return (

    <div style={{ marginBottom : '70px',breakInside :'avoid' }}>

      <div>
        <div className="titleText cursor">
          {title.name[`${initLan}`]}
        </div>
        <div className="rect"></div>
      </div>
      <div className="foods-container cursor">
        {renderFoods()}
      </div>

    </div>

  );

}

MenuBox.propTypes = {

  title:PropTypes.object,

  foods: PropTypes.array

};