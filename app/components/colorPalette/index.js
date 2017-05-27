'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {COLORS} from '../../constants';

class ColorPalette extends Component {
  constructor(props) {
    super(props);

    this.renderColors = this.renderColors.bind(this);
  }

  renderColors() {
    return COLORS.map(color => {
      return (
        <div
          key={color}
          onClick={() => this.props.setColor(color)}
          style={{...styles.colorContainer, ...{backgroundColor: color}}}
        />
      );
    });
  }

  render() {
    const colors = this.renderColors();

    return (
      <div style={styles.paletteContainer}>
        {colors}
      </div>
    );
  }
}

const styles = {
  paletteContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 5,
    right: -1,
    bottom: -88,
    padding: 5,
    borderRight: '1px solid #CFD8DC',
    borderBottom: '1px solid #CFD8DC',
    zIndex: 10,
    backgroundColor: '#fff'
  },

  colorContainer: {
    display: 'flex',
    margin: 5,
    width: 16,
    height: 16,
    borderRadius: 8
  }
};

ColorPalette.propTypes = {
  setColor: PropTypes.func.isRequired
};

export default ColorPalette;
