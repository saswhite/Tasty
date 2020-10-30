import React from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectErrorMsg, selectIsError ,hideError } from '../../Redux/Reducer/error';
import { get } from '../../Common/Intl';
/** scss */
import './error.scss';

export default function Error () {
  const dispatch = useDispatch();
  const isError = useSelector(selectIsError);
  const msg = useSelector(selectErrorMsg);
  const history = useHistory();

  function hideErrorModal (){
    dispatch(hideError());
    if( msg === get(`error.${'auth-failed'}`)){
      history.push('/login');
    }
  }
  return (
    isError ?
      <div className='error'>
        <div className='error-container'>
          <div className='error-modal-box containerCol space-between vertical'>
            <div>{ msg }</div>
            <button className='normal-btn' onClick={  hideErrorModal }>关闭</button>
          </div>
        </div>
      </div> : null
  );
}
