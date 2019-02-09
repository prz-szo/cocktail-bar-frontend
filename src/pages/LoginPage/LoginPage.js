import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

import './LoginPage.css';

class BarPage extends React.Component {
  render() {
    return (
      <div className="content">
        <LoginForm/>
      </div>
    );
  }
}

export default BarPage;
