import React,{ useEffect } from 'react';

import { useDispatch,useSelector } from 'react-redux';

import _ from 'lodash';

import { v4 } from 'uuid';

import moment from 'moment-timezone';

import { init,get } from '../../Common/Intl';

/* component */
import Header from '../../Components/Header/Header';
import RestBox from '../../Components/RestBox/RestBox';

/* action */
import { renderRestList,restdata } from './state/reducer';
import { language } from '../../Redux/Reducer/header';

/* style */
import './rest.scss';

export default function Restaurant () {

  let lan = useSelector(language);

  let dispatch = useDispatch();

  let rest = useSelector(restdata);

  useEffect( () => {
    init();
    dispatch(renderRestList());
  }, []);

  useEffect( () => {
    init();
  }, [ lan ]);

  /* 排序 */
  // function restOrder (){
  // return  _.orderBy(rest.list,[ 'featured' ],[ 'desc' ]);
  // }
  function isOpen (){
    let list = rest.list;
    let date = new Date();
    var newYork = moment.tz(date,'America/New_York');
    const time = new Date(newYork._d);
    let checkTime = time.getHours() * 60 + time.getMinutes();
    console.log(checkTime);
    if(list){
      let newArr = _.map(list,(item)=>{
        if(!item.closed){
          _.map(item.hours,(hourItem)=>{
            if(hourItem.dayOfWeek === newYork.day()){
              if(hourItem.start <= checkTime && checkTime <= hourItem.end){
                item = { ...item,closed:false };
              }
              else{
                item = { ...item,closed:true };
              }
            }
          });
        }else{
          item = { ...item,closed:true };
        }
        return item;
      });
      return newArr;
    }

  }

  let renderRestBox = ()=>{

    let array = isOpen();
    array = _.orderBy(array,[ 'closed', 'featured','zscore' ],[ 'asc','desc','desc' ]);
    let result = _.map(array,(item)=>{
      return ({
        a:item.closed,
        b:item.featured,
        c:item.zscore,
        d:item.name,
        e:item.hours

      });
    });
    console.log(result);
    return _.map(array,((item,index)=>{
      return (
        <div key={ v4() } style={{ paddingTop :(index + 1 ) % 2 === 0 ? '236px' : '' }}>
          <RestBox data={ item } ></RestBox>
        </div>

      );
    }));
  };

  return (
    <div>
      <Header></Header>
      <div className="restBox-container">
        <div className='rest-tab'>
          {get('restaurant.allRestaurant')}
          <div className='under'></div>
        </div>
        <div className='restItem'>
          {renderRestBox()}
        </div>
      </div>
    </div>
  );
}
