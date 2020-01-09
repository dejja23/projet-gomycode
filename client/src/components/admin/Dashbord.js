import React, { Component } from 'react';
import NavAdmin from './NavAdmin';

import UsersTab from './UsersTab';
import AdsTab from './AdsTab';
import CategoriesCard from './CategoriesCard';
import CarModels from './CarModels';
import './style.css';
import { Redirect, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import { getUsers } from '../../actions/user';
import { getAds } from '../../actions/annonce';
import { getCategories } from '../../actions/category';
import Cards from './Cards';
export class Dashbord extends Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.getUsers();
    this.props.getAds();
    this.props.getCategories();
  }
  render() {
    if (!this.props.loading && !this.props.user) {
      return <Redirect to='/' />;
    }

    if (this.props.user) {
      if (this.props.user.role !== 'Admin') return <Redirect to='/' />;
    }
    return (
      <div>
        <NavAdmin />
        <Cards />
        <Switch>
          <Route
            exact
            path='/admin'
            render={() => <UsersTab users={this.props.users} />}
          />
          <Route
            exact
            path='/admin/ads'
            render={() => (
              <AdsTab ads={this.props.ads} categories={this.props.categories} />
            )}
          />
          <Route
            exact
            path='/admin/categories'
            render={() => <CategoriesCard categories={this.props.categories} />}
          />
          <Route
            exact
            path='/admin/category/:manufacturer'
            render={props => (
              <CarModels {...props} categories={this.props.categories} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.authReducer.user,
  loading: state.authReducer.loading,
  users: state.userReducer.users,
  ads: state.adReducer.ads,
  categories: state.categoryReducer.categories
});

export default connect(mapStateToProps, {
  loadUser,
  getUsers,
  getAds,
  getCategories
})(Dashbord);
