import React from 'react';
import './modal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { isShow ,hideModal } from '../../Redux/Reducer/Modal';
import { showErrorAsync } from '../../Redux/Reducer/error';

export default function Modal () {
  const isTrue = useSelector(isShow);

  const dispatch = useDispatch();

  /* 注册 */
  function regist (){
    dispatch(hideModal());
  }

  return (
    isTrue ?
      <div className={ 'modal' }>
        <div className={ 'modal-box' }>
          <div className='input-box'>
            <div className='input-title'> 用户名 </div>
            <input className='input'></input>
          </div>
          <div className='input-box'>
            <div className='input-title'> 密码 </div>
            <input className='input'></input>
          </div>
          <div className='input-box'>
            <div className='input-title'> 确认 </div>
            <input className='input'></input>
          </div>
          <button className='normal-btn' onClick={ ()=>{
            dispatch(showErrorAsync('请输入正确的用户名，4到16位，字母，数字，下划线，减号。'));
          } }>开启error模态框</button>
          <button onClick={ regist } className='normal-btn regist-btn' >注册</button>
        </div>
      </div> : null
  );
}