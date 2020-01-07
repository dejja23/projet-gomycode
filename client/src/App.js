import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => <h1>Home</h1>} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/admin' render={() => <h1>admin</h1>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
