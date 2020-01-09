import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashbord from './components/admin/Dashbord';

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => <h1>Home</h1>} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route path='/admin' component={Dashbord} />
        </Switch>
      </Router>
    );
  }
}

export default App;
