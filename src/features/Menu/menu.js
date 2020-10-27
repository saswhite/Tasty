import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../Components/Modal/Modal';
import { showModal } from '../../Redux/Reducer/Modal';

/* component */
import Header from '../../Components/Header/Header';

export default function Menu () {
  const dispatch = useDispatch();
  return (
    <div>
      <Header></Header>
      <div>
        <button onClick={ ()=>{dispatch(showModal());} }> show</button>
      </div>
      <Modal></Modal>
    </div>
  );
}
