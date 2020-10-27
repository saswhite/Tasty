import React from 'react';
import { useSelector ,useDispatch } from 'react-redux';

import { selectErrorMsg, selectIsError ,hideError } from '../../Redux/Reducer/error';

/** scss */
import './error.scss';

export default function Error () {
  const dispatch = useDispatch();
  const isError = useSelector(selectIsError);
  const msg = useSelector(selectErrorMsg);
  return (
    isError ?
      <div className='error'>
        <div className='error-container'>
          <div className='error-modal-box containerCol space-between vertical'>
            <div>{ msg }</div>
            <button className='normal-btn' onClick={ ()=>{
              dispatch(hideError());
            } }>关闭</button>
          </div>
        </div>
      </div> : null
  );
}
