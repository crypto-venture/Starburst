import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Registration from './Registration';
import Profile from './Profile';
import Bitcoin from './Bitcoin';
import Error from './Error';
import CreateDiscussion from './CreateDiscussion';
import { onLogin, fetchUser } from '../actions';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('access_token') ? (
        // Component is passed React router props : location, match, history
        <Component {...props} />
      ) : (
        <Redirect to="/error" />
      )
    }
  />
);

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/home" component={Dashboard} />
            <PrivateRoute
              exact
              path="/discussions/create"
              component={CreateDiscussion}
            />
            <Route path="/signup" component={Registration} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute path="/btc" component={Bitcoin} />
            <Route path="/error" component={Error} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

// connect(mapStateToProps, { onLogin })(PrivateRoute);

export default connect(mapStateToProps, { fetchUser })(App);
