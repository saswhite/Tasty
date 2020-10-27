import React from 'react';

/* pages */
import Login from '../Features/Login/login';
import Restaurant from '../Features/Restaurant/restaurant';
import Menu from '../Features/Menu/menu';
import Counter from '../Features/Counter/Counter';

export const routerConfig = [
  {
    path:'/login',
    component: Login
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