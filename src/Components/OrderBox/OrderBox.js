import React ,{ useEffect }from 'react';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import Moment from 'moment';

/** 语言 */
import { language  } from '../../Redux/Reducer/header';
import{ init } from '../../Common/Intl';

import './orderBox.scss';

export default function OrderBox ({ data }) {
  let lan = useSelector(language);
  // let list = {};

  useEffect(() => {
    init();
  }, [ lan ]);

  return (
    <div className='order-box'>
      <div className='order-title'>
        <div className='title-text order-item-name'>
          { data.restaurant.name[`${lan}`] }
        </div>
        <div className='sub-title-text'>
          { Moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss') }
        </div>
      </div>
    </div>
  );
}
OrderBox.propTypes = {
  data:propTypes.object
};
