import React from 'react';
import PropTypes from 'prop-types';
import { H2 } from '@blueprintjs/core';

import './Heading.css';

class Heading extends React.Component {
  static propTypes = { name: PropTypes.string };

  render() {
    return (
      <span className='heading'>
          <H2>{this.props.name}</H2>
      </span>
    );
  }
}

export default Heading;
