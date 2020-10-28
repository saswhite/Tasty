import React,{ useState ,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/** 加密 */
import { encode } from '../../Common/crypto';
/** 语言 */
import { language  } from '../../Redux/Reducer/header';
import{ init,get  } from '../../Common/Intl';

/** action */
import { showErrorAsync } from '../../Redux/Reducer/error';
import { sendRequestLogin } from './state/reducer';
import { showModal } from '../../Redux/Reducer/Modal';

/** scss */
import './login.scss';

/* component */
import Header from '../../Components/Header/Header';

/** 登录页面 */
export default function Login () {
  const lan = useSelector(language);

  const dispatch = useDispatch();
  const history = useHistory();

  const [ name,setName ] = useState('');
  const [ password,setPassword ] = useState('');

  useEffect(()=>{
    init();
    console.log(get('login.username'));
  },[]);

  useEffect(()=>{
    init();
  },[ lan ]);

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

      dispatch(showErrorAsync(get('login.error.name')));

    }else if(!passwordRes){

      dispatch(showErrorAsync(get('login.error.password')));
      /** 密码错误 情况密码框 */
      setPassword('');
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
            <div className='input-title'> {get('login.username')}</div>
            <input className='input ' value={ name } onChange={ (e)=>{setName(e.target.value);} }></input>
          </div>

          <div className='input-box'>
            <div className='input-title'> {get('login.password')} </div>
            <input className='input' type="password"  value={ password } onChange={ (e)=>{setPassword(e.target.value);} }></input>
          </div>

          <div className='login-btn-box container-col vertical'>
            <button className='normal-btn login-btn' onClick={ requestLogin }>{get('login.login')}</button>
            <button className='normal-btn regist-btn' onClick={ showRegistModal }>{get('login.signUp')}</button>
          </div>

        </div>
      </div>
    </div>
  );
}
