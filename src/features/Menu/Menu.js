import React,{ useEffect } from 'react';

import { useParams } from 'react-router-dom';

/* component */
import Header from '../../Components/Header/Header';
import Cart from '../../Components/Cart/Cart';

/* style */
import './menu.scss';

export default function Menu () {

  let params = useParams();

  useEffect(() => {
    console.log(params.id);
  }, []);

  return (
    <div>
      <Header></Header>
      <Cart></Cart>

    </div>
  );
}
