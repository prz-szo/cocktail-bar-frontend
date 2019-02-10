import React from 'react-dom';
import { Route, Redirect } from 'react-router-dom';

class AuthorizedRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: this.__isAuthenticated()
    }
  }
  __isAuthenticated = () => {
    return window.localStorage.getItem('userToken') !== null;
  };
  //
  // componentWillMount() {
  //   getLoggedUser()
  // }

  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={props => {
        return this.state.isLoggedIn
          ? <Component {...props} />
          : <Redirect to="/login"/>
      }}/>
    )
  }
}

export default AuthorizedRoute;
