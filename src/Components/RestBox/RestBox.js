import React,{ useEffect } from 'react';
import PropTypes from 'prop-types';

import { get,init } from '../../Common/Intl';

import { useSelector } from 'react-redux';

import _ from 'lodash';

import { defaultItems } from '../../Common/defaultItems';

/* action */
import { language } from '../../Redux/Reducer/header';

/* style */
import './restBox.scss';

/* img */
import dash from '../../Assets/dark-dish.png';

export default function RestBox ({ data }) {

  let lan = useSelector(language);

  useEffect(() => {
    console.log(defaultItems[0].image);
    // console.log(data.items[1].image.url);
  }, []);

  useEffect(() => {
    init();
  }, [ lan ]);

  return (
    <div className="rest-box">
      <div className="titleText">{data.name[`${lan}`]}</div>
      <div className="subTitleText">{get(`tags.${data.tags[0]}`)}</div>
      <div>
        <div className="img-box">
          <div className="img-box1">
            <div className="rest-food-name">
            </div>
            <div className="rest-image-box">
              <img src={ dash } className='dash-img'/>
              <img src={ _.get(data,'items[0].image.url',defaultItems[0].image) } className='food-img'/>
            </div>
          </div>
          <div className="img-box2">
            <div className="rest-food-name">
            </div>
            <div className="rest-image-box">
              <img src={ dash } className='dash-img'/>
              <img src={ _.get(data,'items[1].image.url',defaultItems[1].image) } className='food-img'/>
            </div>
          </div>
          <div className="img-box3">
            <div className="rest-food-name">
            </div>
            <div className="rest-image-box">
              <img src={ dash } className='dash-img'/>
              <img src={ _.get(data,'items[2].image.url',defaultItems[2].image) } className='food-img'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

RestBox.propTypes = {
  data : PropTypes.object
};

