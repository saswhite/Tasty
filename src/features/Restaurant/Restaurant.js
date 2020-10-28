import React,{ useEffect } from 'react';

import { useDispatch,useSelector } from 'react-redux';

import _ from 'lodash';

import { v4 } from 'uuid';

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

  useEffect(() => {
    dispatch(renderRestList());
  }, []);

  let renderRestBox = ()=>{
    return _.map(rest.list,(item=>{
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
