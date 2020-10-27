import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../Components/Modal/Modal';
import { showModal } from '../../Redux/Reducer/Modal';

/* component */
import Header from '../../Components/Header/Header';

/* style */
import './menu.scss';

export default function Menu () {
  const dispatch = useDispatch();
  return (
    <div>
      <Header></Header>
      <div>
        <button onClick={ ()=>{dispatch(showModal());} } className="top"> show</button>
      </div>
      <Modal></Modal>
    </div>
  );
}
