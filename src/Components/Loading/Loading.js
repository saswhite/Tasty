import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../Redux/Reducer/loading';

/** scss */
import './loading.scss';
/** Assets */
import loadingLocal from '../../Assets/loading.gif';

export default function Loading () {

  const isLoading = useSelector(selectIsLoading);

  return (
    isLoading  ?
      <div className='loading'>
        <div className='loading-opacityContainer'></div>
        <div className='loading-container'>
          <img src={ loadingLocal }  alt='loading'></img>
        </div>
      </div> : null
  );
}
