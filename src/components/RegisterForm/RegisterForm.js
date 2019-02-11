import React from 'react';
import {
  Button,
  Card,
  Elevation,
  InputGroup,
  Tooltip,
  Intent,
} from '@blueprintjs/core';
import Heading from '../../components/Heading/Heading';

import './RegisterForm.css';
import { fetchJson, prepareParams } from '../../utils/fetch';
import { withRouter } from 'react-router-dom';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      showPassword2: false,
      password: '',
      password2: '',
      email: '',
      errors: []
    }
  }

  __handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });
  __handleLockClick2 = () => this.setState({ showPassword2: !this.state.showPassword2 });

  __logIn = async () => {
    const {email, password, password2} = this.state;

    if(password === password2) {
      const result = (await fetchJson(
        `${process.env.REACT_APP_BACK}/users/`,
        prepareParams({email, password}, 'POST')));
      if(result.message === "No data returned from the query.") {
        this.setState({errors: ['Provided user does not exist']})
      } else if(result.message === "Invalid request data") {
        this.setState({errors: ['Provided data are invalid']})
      }
      if(result.token) {
        window.localStorage.setItem('token', result.token);
        this.props.history.push('/bar');
      }
    } else {
      this.setState({errors: ['Provided passwords are not equal']})
    }
  };

  render() {
    const showPassword = this.state.showPassword;
    const showPassword2 = this.state.showPassword2;
    return (
      <Card elevation={Elevation.THREE}>
        <Heading name={'Register Form'}/>
        <h5 className="bp3-heading">Please provide your email and password</h5>
        <span className='warning'>{this.state.errors}</span>
        <InputGroup
          large
          placeholder="Enter email..."
          onChange={(e) => {
            this.setState({ email: e.target.value, errors: [] });
          }}
        />
        <InputGroup
          large
          placeholder="Enter password..."
          rightElement={
            <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
              <Button
                icon={showPassword ? "unlock" : "lock"}
                intent={Intent.WARNING}
                minimal
                onClick={this.__handleLockClick}
              />
            </Tooltip>
          }
          type={showPassword ? "text" : "password"}
          onChange={(e) => {
            this.setState({ password: e.target.value, errors: [] });
          }}
        />
        <InputGroup
          large
          placeholder="Repeat password..."
          rightElement={
            <Tooltip content={`${showPassword2 ? "Hide" : "Show"} Password`}>
              <Button
                icon={showPassword2 ? "unlock" : "lock"}
                intent={Intent.WARNING}
                minimal
                onClick={this.__handleLockClick2}
              />
            </Tooltip>
          }
          type={showPassword2 ? "text" : "password"}
          onChange={(e) => {
            this.setState({ password2: e.target.value, errors: [] });
          }}
        />
        <Button fill large icon='confirm'
                intent={Intent.PRIMARY}
                onClick={this.__logIn}
        >Submit</Button>
      </Card>
    );
  }
}

export default withRouter(LoginForm);
