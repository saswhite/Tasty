import React from 'react';
import { useDispatch } from 'react-redux';
import { showLoading } from '../../Redux/Reducer/loading';

/** scss */
import './login.scss';
export default function Login () {

  const dispatch = useDispatch();

  return (
    <div>
      login
      <h1>login</h1>
      <button onClick={ ()=>{
        dispatch(showLoading());
      } }>开启loading</button>
    </div>
  );
}
