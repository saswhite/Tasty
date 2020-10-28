import React,{ useEffect } from 'react';

import { useDispatch,useSelector } from 'react-redux';

import _ from 'lodash';

import { v4 } from 'uuid';

import moment from 'moment-timezone';

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
    dispatch(renderRestList());
  }, []);

  /* 排序 */
  // function restOrder (){
  // return  _.orderBy(rest.list,[ 'featured' ],[ 'desc' ]);
  // }

  let renderRestBox = ()=>{
    let array = [];
    if(rest.list){
      array = _.orderBy(rest.list,[ 'featured','zscore' ],[ 'desc','desc' ]);
      let date = new Date();
      var newYork = moment.tz(date, array[0].timezone);
      const time = new Date(newYork._d);
      let checkTime = time.getHours() * 60 + time.getMinutes();
      console.log(checkTime);
      // let timeResult = {
      //   week:[],
      //   hour:[]
      // };
      // _.map(array,(item,index)=>{
      // _.map(item.hours,(hourItem,hourIndex)=>{
      //   if(_.includes(hourItem, 2)){
      //     // timeResult.weekClose = '';
      //     if(hourItem.start >= checkTime || hourItem.end <= checkTime){
      //       timeResult.hour.push(hourIndex);
      //     }
      //   }else{
      //     console.log(index,hourIndex);
      //   }
      // });

      // });
      // console.log(timeResult);
    }

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
