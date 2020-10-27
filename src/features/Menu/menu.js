import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../Components/Modal/Modal';
import { showModal } from '../../Redux/Reducer/Modal';
<<<<<<< HEAD

/* component */
import Header from '../../Components/Header/Header';

/* style */
import './menu.scss';

export default function Menu () {
=======
export default function Menu (){
>>>>>>> 1841a7d4db8567c8df57d98bc85a135246c09573
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
