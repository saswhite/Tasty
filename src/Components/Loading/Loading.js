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
    <div>
      { isLoading } ?
      <div className='loading'>
        <img src={ loadingLocal } className='loading-container' alt='loading'></img>
      </div> : null
    </div>
  );
}
