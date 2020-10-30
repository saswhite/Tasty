import React from 'react';
import PropTypes from 'prop-types';
import { Route,Redirect } from 'react-router-dom';
import { getStorage } from './utils';

export default function PrivateRouter ({ component: Component , ...rest }) {

  let auth = true;
  if(rest.path === '/'){
    auth = false;
  }
  let user = getStorage('user');
  if(!user){
    // auth = true;
    // if(rest.path === '/order'){

    //   auth = false;
    // }
  }else{
    if(rest.path === '/login'){
      auth = false;
    }
  }

  return (

    <Route { ...rest } render={ ()=>{
      return (

        auth ? <Component/> : <Redirect to='/restaurant'></Redirect>
      );

    } } ></Route>

  );
}

PrivateRouter.propTypes = {
  component: PropTypes.func
};
