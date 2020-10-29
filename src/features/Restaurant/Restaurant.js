import React,{ useEffect } from 'react';

import { useDispatch,useSelector } from 'react-redux';

import _ from 'lodash';

import { v4 } from 'uuid';

import moment from 'moment-timezone';

import { init } from '../../Common/Intl';

/* component */
import Header from '../../Components/Header/Header';
import RestBox from '../../Components/RestBox/RestBox';

/* action */
import { renderRestList,restdata } from './state/reducer';

/* style */
import './rest.scss';

export default function Restaurant () {

  let dispatch = useDispatch();

  let rest = useSelector(restdata);

  useEffect( () => {
    init();
    dispatch(renderRestList());
  }, []);

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
      let sum = 0;
      let newArr = _.map(list,(item,index)=>{
        if(!item.closed){
          _.map(item.hours,(hourItem)=>{
            if(hourItem.dayOfWeek === newYork.day()){
              if(hourItem.start <= checkTime && checkTime <= hourItem.end){
                console.log('open',index);
                item = { ...item,closed:false };
                sum++;
              }
              else{
                console.log('close',index);
                item = { ...item,closed:true };
              }
            }
            // else{
            //   item = { ...item,closed:true };
            //   // console.log(item);
            // }
          });
        }else{
          console.log('custom',index);
          item = { ...item,closed:true };
        }
        return item;
      });
      console.log(sum);
      return newArr;
    }

  }

  let renderRestBox = ()=>{

    let array = isOpen();
    array = _.orderBy(array,[ 'closed', 'featured','zscore' ],[ 'asc','desc','desc' ]);

    // let num = 0;
    let result = _.map(array,(item)=>{
      // if(item.closed == false){
      //   return  num++;
      // }
      return ({
        a:item.closed,
        b:item.featured,
        c:item.zscore,
        d:item.name,
        e:item.hours

      });
    });
    console.log(result);
    // console.log(array);
    return _.map(array,(item=>{
      return (
        <div key={ v4() }>
          <RestBox data={ item } ></RestBox>
        </div>
      );
    }));
  };

  return (
    <div>
      <Header></Header>
      <div className="restBox-container">{renderRestBox()}</div>
    </div>
  );
}
