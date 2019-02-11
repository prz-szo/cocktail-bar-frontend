import React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

import './RegisterPage.css';

class RegisterPage extends React.Component {
  render() {
    return (
      <div className="content">
        <RegisterForm/>
      </div>
    );
  }
}

export default RegisterPage;
