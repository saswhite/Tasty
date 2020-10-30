
import React,{ useEffect } from 'react';

import PropTypes from 'prop-types';

import _ from 'lodash';

import { v4 } from 'uuid';

import { getStorage } from '../../Common/utils';

/* style */

import './menuBox.scss';

export default function MenuBox ({ title,foods }) {

  let initLan = getStorage('language');

  useEffect(() => {

    console.log(title._id);

    // console.log(_.groupBy(foods,`category.${'_id'}`));

    // renderFoods();

  }, []);

  let renderFoods = ()=>{

    return _.map(_.groupBy(foods,`category.${'_id'}`)[title._id],(item)=>{

      console.log(item);

      if(item.category._id === title._id){

        return (

          <div key={ v4() } className='menu-box-item'>

            <div >{item.name[`${initLan}`]}</div>

            <div>${(item.price / 100).toFixed(2)}</div>

          </div>
        );

      }

    });

  };

  return (

    <div style={{ marginBottom : '70px',breakInside :'avoid' }}>

      <div className="titleText cursor">{title.name[`${initLan}`]}</div>

      <div className="foods-container cursor">{renderFoods()}</div>

    </div>

  );

}

MenuBox.propTypes = {

  title:PropTypes.object,

  foods: PropTypes.array

};