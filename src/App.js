import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import BarPage from './pages/BarPage/BarPage';
import NavigationBar from './components/NavigationBar/NavigationBar'

import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <Route path="/" component={HomePage} exact/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/bar" component={BarPage}/>
      </div>
    );
  }
}

export default App;
