import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

import './RegisterPage.css';

class RegisterPage extends React.Component {
  render() {
    return (
      <div className="content">
        <LoginForm/>
      </div>
    );
  }
}

export default RegisterPage;
