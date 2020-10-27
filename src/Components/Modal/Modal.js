import React from 'react';
import './modal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { isShow ,hideModal } from '../../Redux/Reducer/Modal';

export default function Modal () {
  const isTrue = useSelector(isShow);
  const dispatch = useDispatch();
  return (
    isTrue ?
      <div className={ 'modal' }>
        <div className={ 'modal-box' }>
          <span>message</span>
          <button onClick={ ()=>{dispatch(hideModal());} }>确认</button>
        </div>
      </div> : null
  );
}
