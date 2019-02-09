import React from 'react';
import { Alignment, Button, Navbar } from '@blueprintjs/core';
import * as Classes from '@blueprintjs/core/lib/esm/common/classes';

import './NavigationBar.css';


class NavigationBar extends React.Component {
  render() {
    return <Navbar fixedToTop={true}>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading className={Classes.HEADING}>Cocktail Bar</Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button large={true} minimal={true} icon="log-in" text="Login"/>
        <Navbar.Divider/>
        <Button large={true} minimal={true} icon="add" text="Register"/>
      </Navbar.Group>
    </Navbar>;
  }
}

export default NavigationBar;
