import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Donate from './components/Donate/Donate';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <Route path="/" exact component={HomePage} />
          <Route path="/start" exact component={Register} />
          <Route path="/donate" exact component={Donate} />
          <Route path="/dashboard/:uid" exact component={Dashboard} />
        </div>
      </div>
    );
  }
}

export default App;
