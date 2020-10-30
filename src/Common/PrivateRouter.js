import React from 'react';
import PropTypes from 'prop-types';
import { Route,Redirect } from 'react-router-dom';
import { getStorage } from './utils';

export default function PrivateRouter ({ component: Component , ...rest }) {

  let auth = true;
  let user = getStorage('user');

  if(rest.path === '/'){
    auth = false;
  }

  /** 如果未登录 不可以进入order 页面 */
  if(!user){
    if(rest.path === '/order'){

      auth = false;
    }
  }else{
    /** 已经登录的情况下 不可以再进入login */
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
