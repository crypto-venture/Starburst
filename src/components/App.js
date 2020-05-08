import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Registration from './Registration';
import Profile from './Profile';
import Bitcoin from './Bitcoin';
import Ethereum from './Ethereum';

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
            <Route exact path="/home" component={Dashboard} />
            <Route path="/signup" component={Registration} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/btc" component={Bitcoin} />
            <Route path="/eth" component={Ethereum} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
