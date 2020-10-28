import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import intl from 'react-intl-universal';
import { encode } from '../../Common/crypto';

/** action */
import { showErrorAsync } from '../../Redux/Reducer/error';
import { sendRequestLogin } from './state/reducer';
import { showModal } from '../../Redux/Reducer/Modal';

/** scss */
import './login.scss';

/* component */
import Header from '../../Components/Header/Header';
import Modal from '../../Components/Modal/Modal';

/** 登录页面 */
export default function Login () {
  const dispatch = useDispatch();
  const history = useHistory();

  const [ name,setName ] = useState('');
  const [ password,setPassword ] = useState('');

  /** 正则 */
  const nameReg = /^[a-zA-Z0-9_-]{4,16}$/;
  const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

  /** 正则检测通过时，发送request post 请求 */
  function requestLogin (){
    let result = loginCheck();
    if(result){

      /** 给用户名、密码加密  */
      let loginData = { username:encode(name),password:encode(password) };

      const loginRequestRes = dispatch(sendRequestLogin(loginData));

      /** 如果登录的请求发送成功 回退到从哪个页面点进login页面的*/
      if(loginRequestRes){
        history.goBack();
      }
    }
  }

  /** 正则检测   */
  function loginCheck (){
    let nameRes = nameReg.test(name);
    let passwordRes = passwordReg.test(password);

    if(nameRes && passwordRes){
      return true;

    }else if(!nameRes){

      dispatch(showErrorAsync(intl.get('login.error.name')));

    }else if(!passwordRes){

      dispatch(showErrorAsync(intl.get('login.error.password')));
    }
  }

  function showRegistModal (){

    dispatch(showModal());
  }

  return (
    <div>
      <Header></Header>
      <div className='center-box'>
        <div>
          <div className='input-box'>
            <div className='input-title'> {intl.get('login.username')}</div>
            <input className='input ' value={ name } onChange={ (e)=>{setName(e.target.value);} }></input>
          </div>

          <div className='input-box'>
            <div className='input-title'> {intl.get('login.password')} </div>
            <input className='input' type="password"  value={ password } onChange={ (e)=>{setPassword(e.target.value);} }></input>
          </div>

          <div className='login-btn-box container-col vertical'>
            <button className='normal-btn login-btn' onClick={ requestLogin }>{intl.get('login.login')}</button>
            <button className='normal-btn regist-btn' onClick={ showRegistModal }>{intl.get('login.signUp')}</button>
          </div>

        </div>
        <Modal></Modal>
      </div>
    </div>
  );
}
