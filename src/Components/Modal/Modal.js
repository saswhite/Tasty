import React, { useState  } from 'react';
import intl from 'react-intl-universal';
import './modal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { isShow,postRegist,hideModal  } from '../../Redux/Reducer/Modal';
import { showErrorAsync } from '../../Redux/Reducer/error';
import { encode } from '../../Common/crypto';

export default function Modal () {
  const isTrue = useSelector(isShow);

  const dispatch = useDispatch();

  const [ registInfo,setRegistInfo ] = useState({
    username:'',
    password:'',
    checkPwd:''
  });

  /* 注册 */
  async function registBtn (){
    const nameReg = /^[a-zA-Z0-9_-]{4,16}$/;
    const pwdReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    /* 验证用户名 */
    if(nameReg.test(registInfo.username)){
      /* 验证密码 */
      if(pwdReg.test(registInfo.password)){
        /* 检查密码 */
        if(registInfo.password === registInfo.checkPwd){
          const info = { username:encode(registInfo.username),password:encode(registInfo.password) };
          let result = dispatch(postRegist(info));
          if(result){
            setRegistInfo({});
          }
        }else{
          dispatch(showErrorAsync(intl.get('login.error.comfirmPassword')));
        }
      }else{
        dispatch(showErrorAsync(intl.get('login.error.password')));
      }
    }else{
      dispatch(showErrorAsync(intl.get('login.error.name')));
    }
  }

  return (
    isTrue ?
    /* 点击外面隐藏模态框 清空数据 */
      <div className={ 'modal' } onClick={ ()=>{dispatch(hideModal()); setRegistInfo({});} }  >
        {/* 阻止事件冒泡 */}
        <div className={ 'modal-box' } onClick={ (e)=>{e.stopPropagation();} }>
          <div className='input-box'>
            <div className='input-title'> {intl.get('login.username')}  </div>
            <input className='input' value={ registInfo.username } onChange={ (e)=>{setRegistInfo({ ...registInfo,username:e.target.value });} }></input>
          </div>
          <div className='input-box'>
            <div className='input-title'> {intl.get('login.password')} </div>
            <input className='input' type='password' value={ registInfo.password } onChange={ (e)=>{setRegistInfo({ ...registInfo,password:e.target.value });} }></input>
          </div>
          <div className='input-box'>
            <div className='input-title'> {intl.get('login.confirmPassword')} </div>
            <input className='input' type='password' value={ registInfo.checkPwd } onChange={ (e)=>{setRegistInfo({ ...registInfo,checkPwd:e.target.value });} }></input>
          </div>
          <button onClick={ registBtn } className='normal-btn regist-btn' >{intl.get('login.signUp')}</button>
        </div>
      </div> : null
  );
}