import React from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectErrorMsg, selectIsError ,hideError } from '../../Redux/Reducer/error';
import { clearUserInfo } from '../../Features/Login/state/reducer';
import { get } from '../../Common/Intl';
import { setStorage } from '../../Common/utils';
/** scss */
import './error.scss';

export default function Error () {
  const dispatch = useDispatch();
  const isError = useSelector(selectIsError);
  const msg = useSelector(selectErrorMsg);
  const history = useHistory();

  /** 关闭error模态框 */
  function hideErrorModal (){
    dispatch(hideError());
    /** 当用户信息过期时，清空本地user信息，并且跳转至login页面 */
    if( msg === get(`error.${'auth-failed'}`) || msg === get( `error.${'need-login'}`)){
      dispatch(clearUserInfo());
      setStorage('user',null);
      history.push('/login');
    }
  }
  return (
    isError ?
      <div className='error'>
        <div className='error-container'>
          <div className='error-modal-box containerCol space-between vertical'>
            <div>{ msg }</div>
            <button className='normal-btn' onClick={  hideErrorModal }>{ get('close') }</button>
          </div>
        </div>
      </div> : null
  );
}
