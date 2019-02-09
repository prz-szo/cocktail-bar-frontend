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


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    }
  }

  __handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });

  render() {
    const showPassword = this.state.showPassword;
    return (
      <Card elevation={Elevation.THREE}>
        <Heading name={'Cocktail Bar'}/>
        <h5 className="bp3-heading">Please provide your email and password</h5>

        <InputGroup
          large
          placeholder="Enter your email..."
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
        />
        <Button fill large icon='confirm' intent={Intent.PRIMARY}>Submit</Button>
      </Card>
    );
  }
}

export default LoginForm;
