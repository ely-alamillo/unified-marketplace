import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Register from './components/Register/Register';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <Route path="/" exact component={HomePage} />
          <Route path="/start" exact component={Register} />
        </div>
      </div>
    );
  }
}

export default App;
