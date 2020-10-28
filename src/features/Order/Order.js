import React from 'react';
import PropTypes from 'prop-types';

/* component */
import Header from '../../Components/Header/Header';

export default function Order () {

  return (
    <div>
      <Header></Header>
    </div>
  );
}

Order.propTypes = {
  children: PropTypes.string
};

