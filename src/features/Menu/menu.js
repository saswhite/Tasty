import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../Components/Modal/Modal';
import { showModal } from '../../Redux/Reducer/Modal';
export default function Menu () {
  const dispatch = useDispatch();
  return (
    <div>
      menu
      <div>
        <button onClick={ ()=>{dispatch(showModal());} }> show</button>
      </div>
      <Modal></Modal>
    </div>
  );
}
