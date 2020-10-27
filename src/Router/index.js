import React from 'react';

/* pages */
import Login from '../Features/Login/login';
import Regist from '../Features/Regist/regist';
import Restaurant from '../Features/Restaurant/Restaurant';
import Menu from '../Features/Menu/menu';
import Counter from '../Features/Counter/Counter';
import Order from '../Features/Order/Order';

export const routerConfig = [
  {
    path:'/login',
    component: Login
  },
  {
    path:'/regist',
    component:Regist
  },
  {
    path:'/restaurant',
    component:Restaurant
  },
  {
    path:'/menu',
    component:Menu
  },
  {
    path:'/order',
    component:Order
  },
  {
    path:'/counter',
    component: Counter
  },
  {
    path:'/',
    component:()=>{
      return(
        <div>111</div>
      );
    }
  },
  {
    path:'*',
    component:()=>{
      return (
        <div>404</div>
      );
    }
  },
];