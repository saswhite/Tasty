import React from 'react';

/* pages */
<<<<<<< HEAD
import Login from '../Features/Login/Login';
import Restaurant from '../Features/Restaurant/restaurant';
import Menu from '../Features/Menu/Menu';
=======
import Login from '../Features/Login/login';
import Restaurant from '../Features/Restaurant/Restaurant';
import Menu from '../Features/Menu/menu';
>>>>>>> 27009dcb4a5611692b960c8845ed99a559b707e4
import Counter from '../Features/Counter/Counter';
import Order from '../Features/Order/Order';

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