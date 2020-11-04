import React,{ useEffect } from 'react';

import { useDispatch,useSelector } from 'react-redux';

import _ from 'lodash';

import { v4 } from 'uuid';

// import moment from 'moment-timezone';

import { init,get } from '../../Common/Intl';

/* component */
import Header from '../../Components/Header/Header';
import RestBox from '../../Components/RestBox/RestBox';

/* action */
import { renderRestList,restdata } from './state/reducer';
import { language } from '../../Redux/Reducer/header';

/* style */
import './rest.scss';

/* function */
import { isClosed } from '../../Common/utils';

export default function Restaurant () {

  let lan = useSelector(language);

  let dispatch = useDispatch();

  let rest = useSelector(restdata);

  // const [ array,setArray ] = useState([]);

  useEffect( () => {
    init();
    dispatch(renderRestList());
  }, []);

  useEffect( () => {
    init();
  }, [ lan ]);

  /* 判断是否关门 */
  function checkClosed  (){
    let list = rest.list;
    let newArr = [];
    _.map(list,(item)=>{
      let result = isClosed(item);
      newArr.push({ ...item,closed:result });
    });
    return newArr;
  }

  /* 排序 */
  function orderRest (){
    /* 先判断是否开门 */
    let array = checkClosed();
    /* 排序 */
    array = _.orderBy(array,[ 'closed', 'featured','zscore' ],[ 'asc','desc','desc' ]);
    // let test = _.map(array,(item)=>{
    //   return item.closed;
    // });
    // console.log(test);
    return array;
  }

  /* 渲染餐馆 */
  let renderRestBox = ()=>{
    return _.map(orderRest(),((item,index)=>{
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
