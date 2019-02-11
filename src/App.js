import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import BarPage from './pages/BarPage/BarPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import NavigationBar from './components/NavigationBar/NavigationBar'

import './App.css';
import AuthorizedRoute from './utils/AuthorizedRoute';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <AuthorizedRoute path='/bar' isAuthenticated={!!window.localStorage.getItem('token')} component={BarPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
