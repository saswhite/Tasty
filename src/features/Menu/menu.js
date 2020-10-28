import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../Components/Modal/Modal';
import { showModal } from '../../Redux/Reducer/Modal';
import { login } from '../../Request/login';

/* component */
import Header from '../../Components/Header/Header';

/* style */
import './menu.scss';

export default function Menu () {
  const dispatch = useDispatch();
  async function loginTest (){

    try {
      let result = await login();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Header></Header>
      <div>
        <button onClick={ ()=>{dispatch(showModal());} } className="top"> show</button>
      </div>
      <button onClick={ loginTest }>login</button>
      <Modal></Modal>
    </div>
  );
}
