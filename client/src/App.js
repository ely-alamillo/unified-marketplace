import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Donate from './components/Donate/Donate';
import Cart from './components/Donate/Cart/Cart';
import Navigation from './components/Navigation/Navigation';
import Success from './components/Donate/Success/Success';
import Failed from './components/Donate/Failed/Failed';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Navigation />
          <div className="container">
            <Route path="/" exact component={HomePage} />
            <Route path="/start" exact component={Register} />
            <Route path="/donate" exact component={Donate} />
            <Route path="/success" exact component={Success} />
            <Route path="/failed" exact component={Failed} />
            <Route path="/cart/:donations" exact component={Cart} />
            <Route path="/dashboard/:uid" exact component={Dashboard} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
