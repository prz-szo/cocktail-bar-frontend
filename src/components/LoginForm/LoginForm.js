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

import './LoginForm.css';
import { fetchJson, prepareParams } from '../../utils/fetch';
import { withRouter } from 'react-router-dom';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      password: '',
      email: '',
      errors: []
    }
  }

  __handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });

  __logIn = async () => {
    const {email, password} = this.state;
    const result = (await fetchJson(
      `${process.env.REACT_APP_BACK}/users/login`,
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
  };

  render() {
    const showPassword = this.state.showPassword;
    return (
      <Card elevation={Elevation.THREE}>
        <Heading name={'Cocktail Bar'}/>
        <h5 className="bp3-heading">Please provide your email and password</h5>
        <span className='warning'>{this.state.errors}</span>
        <InputGroup
          large
          placeholder="Enter your email..."
          onChange={(e) => {
            this.setState({ email: e.target.value, errors: [] });
          }}
        />
        <InputGroup
          large
          placeholder="Enter your password..."
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
        <Button fill large icon='confirm'
                intent={Intent.PRIMARY}
                onClick={this.__logIn}
        >Submit</Button>
      </Card>
    );
  }
}

export default withRouter(LoginForm);
