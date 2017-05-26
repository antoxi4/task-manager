'use strict';

import React from 'react';
import PropTypes from 'prop-types';

let ItemContainer = props => (
  <div style={{...styles.itemContainer, ...{borderWidth: `${props.isBorder ? '1px' : '0px'}`}}}>
    {props.children}
  </div>
);

const styles = {
  itemContainer: {
    borderRight: '1px solid #78909C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    marginTop: 5,
    marginBottom: 5
  }
};

ItemContainer.propTypes = {
  children: PropTypes.node.isRequired,
  isBorder: PropTypes.bool.isRequired
};

export default ItemContainer;
