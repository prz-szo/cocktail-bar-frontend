import React from 'react';
import Heading from '../../components/Heading/Heading';

import './Bar.css';
import { Button, ControlGroup, InputGroup } from '@blueprintjs/core';

class Bar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Heading name='Your bar'/>
        <ControlGroup>
          <InputGroup placeholder="Find ingredient..." />
          <Button icon="plus" />
        </ControlGroup>
      </React.Fragment>
    );
  }
}

export default Bar;
