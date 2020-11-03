import React,{ useEffect,useState } from 'react';

import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';

import { get,init } from '../../Common/Intl';

import { useSelector } from 'react-redux';

import _ from 'lodash';

import { v4 } from 'uuid';

import { defaultItems } from '../../Common/defaultItems';

import { getStorage,setStorage } from '../../Common/utils';

/* action */
import { language } from '../../Redux/Reducer/header';

/* style */
import './restBox.scss';

/* img */
import dash from '../../Assets/dark-dish.png';

export default function RestBox ({ data }) {

  const lan = useSelector(language);

  const [ isHover,setIsHover ] = useState(false);

  const initLan = getStorage('language');

  const history = useHistory();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [ lan ]);

  /* 渲染标签 */
  let renderTags = ()=>{
    return _.map(data.tags,(item)=>{
      return (
        <span className="subTitleText" key={ v4() }>{get(`tags.${item}`)}</span>
      );
    });
  };

  return (
    <div className="rest-box"
      onClick={ ()=>{
        setStorage('restaurant',data);
        history.push(`/menu/${data._id}`);
      } }
      onMouseOver={ ()=>{
        setIsHover(true);
      } }
      onMouseOut={ ()=>{
        setIsHover(false);
      } }>
      <div className="titleText">{data.name[`${initLan}`]}</div>
      {renderTags()}
      <div>
        <div className="img-box">
          <div className="img-box1">
            { isHover ? (<div className="rest-food-name">
              { _.get(data,`items[0].name[${initLan}]`,defaultItems[0].name[`${initLan}`])}
            </div>) : null}
            <div className="rest-image-box">
              <img src={ dash } className='dash-img'/>
              <img src={ _.get(data,'items[0].image.url',defaultItems[0].image) } className='food-img'/>
            </div>
          </div>
          <div className="img-box2">
            { isHover ? (<div className="rest-food-name">
              { _.get(data,`items[1].name[${initLan}]`,defaultItems[1].name[`${initLan}`])}
            </div>) : null}
            <div className="rest-image-box">
              <img src={ dash } className='dash-img'/>
              <img src={ _.get(data,'items[1].image.url',defaultItems[1].image) } className='food-img'/>
            </div>
          </div>
          <div className="img-box3">
            { isHover ? (<div className="rest-food-name">
              { _.get(data,`items[2].name[${initLan}]`,defaultItems[2].name[`${initLan}`])}
            </div>) : null}
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

