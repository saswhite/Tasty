import React,{ useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showLoading } from '../../Redux/Reducer/loading';
import { showErrorAsync } from '../../Redux/Reducer/error';
import { getUserInfo } from './state/reducer';

/** scss */
import './login.scss';
export default function Login () {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <div>
      login
      <h1>login</h1>
      <button className='normal-btn' onClick={ ()=>{
        dispatch(showLoading());
      } }>开启loading</button>

      <button className='normal-btn' onClick={ ()=>{
        dispatch(showErrorAsync('请输入正确的用户名，4到16位，字母，数字，下划线，减号。'));
      } }>开启error模态框</button>

    </div>
  );
}
