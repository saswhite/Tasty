import React,{ useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../../Redux/Reducer/Modal';

import { useParams } from 'react-router-dom';

/* component */
import Header from '../../Components/Header/Header';

/* style */
import './menu.scss';

export default function Menu () {
  const dispatch = useDispatch();

  let params = useParams();

  useEffect(() => {
    console.log(params.id);
  }, []);

  return (
    <div>
      <Header></Header>
      <div>
        <button onClick={ ()=>{dispatch(showModal());} } className="top"> show</button>
      </div>
    </div>
  );
}
