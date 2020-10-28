import React,{ useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { showLoading } from '../../Redux/Reducer/loading';
import { showErrorAsync } from '../../Redux/Reducer/error';
import { getUserInfo } from './state/reducer';

import { language } from '../../Redux/Reducer/header';

import { get,init } from '../../Common/Intl';

/** scss */
import './login.scss';

/* component */
import Header from '../../Components/Header/Header';

export default function Login () {

  let lan = useSelector(language);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
    init();
  }, []);

  useEffect(()=>{
    init();
  },[ lan ]);

  return (
    <div>
      <Header></Header>
      <h1>{get('login.login')}</h1>
      <button className='normal-btn' onClick={ ()=>{
        dispatch(showLoading());
      } }>开启loading</button>

      <button className='normal-btn' onClick={ ()=>{
        dispatch(showErrorAsync('请输入正确的用户名，4到16位，字母，数字，下划线，减号。'));
      } }>开启error模态框</button>

    </div>
  );
}
