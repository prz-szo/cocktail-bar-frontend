import React from 'react';
import { Alignment, Button, Navbar } from '@blueprintjs/core';
import * as Classes from '@blueprintjs/core/lib/esm/common/classes';

import './NavigationBar.css';
import { NavLink } from 'react-router-dom';


const LINKS = [
  {
    to: '/bar',
    icon: 'shop',
    text: 'Your bar'
  },
  {
    to: '/login',
    icon: 'log-in',
    text: 'Login'
  },
  {
    to: '/register',
    icon: 'add',
    text: 'Register'
  },
];

class NavigationBar extends React.Component {
  __renderLinks() {
    return LINKS.map((link, index) =>
      <React.Fragment key={link.to}>
        <NavLink to={link.to}>
          <Button large minimal icon={link.icon} text={link.text}/>
        </NavLink>
        {index !== LINKS.length-1 ? <Navbar.Divider/> : null}
      </React.Fragment>
    );
  }

  render() {
    return <Navbar fixedToTop>
      <Navbar.Group align={Alignment.LEFT}>
        <NavLink to='/' exact>
          <Navbar.Heading className={Classes.HEADING}>Cocktail Bar</Navbar.Heading>
        </NavLink>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        {this.__renderLinks()}
      </Navbar.Group>
    </Navbar>;
  }
}

export default NavigationBar;
