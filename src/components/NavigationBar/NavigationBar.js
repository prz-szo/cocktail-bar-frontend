import React from 'react';
import { Alignment, Button, Navbar } from '@blueprintjs/core';
import * as Classes from '@blueprintjs/core/lib/esm/common/classes';

import './NavigationBar.css';
import { NavLink, withRouter } from 'react-router-dom';
import { isAuthenticated } from '../../utils/isAuthenticated';


class NavigationBar extends React.Component {
  render() {
    return <Navbar fixedToTop>
      <Navbar.Group align={Alignment.LEFT}>
        <NavLink to='/' exact>
          <Navbar.Heading className={Classes.HEADING}>Cocktail Bar</Navbar.Heading>
        </NavLink>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        {isAuthenticated() &&
        <NavLink to='/bar'>
          <Button large minimal icon='shop' text='Your bar'/>
        </NavLink>
        }
        <Navbar.Divider/>
        {!isAuthenticated() ?
          <NavLink to='/login'>
            <Button large minimal icon='log-in' text='Login'/>
          </NavLink>
          : <Button large minimal icon='log-in' text='Logout' onClick={()=> {
            window.localStorage.removeItem('token');
            this.props.history.push('/');
          }}/>
        }
        <Navbar.Divider/>
        <NavLink to='/register'>
          <Button large minimal icon='add' text='Register'/>
        </NavLink>
        <Navbar.Divider/>
      </Navbar.Group>
    </Navbar>;
  }
}

export default withRouter(NavigationBar);
